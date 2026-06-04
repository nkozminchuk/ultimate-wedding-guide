const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const {
      accessCode,
      region,
      buyerName,
      buyerEmail,
      isGift,
      recipientName,
      recipientEmail,
      senderName,
      giftMessage,
      editionLabel,
    } = session.metadata;

    const deliveryEmail = isGift === 'true' ? recipientEmail : buyerEmail;
    const deliveryName = isGift === 'true' ? recipientName : buyerName;

    // Region-specific messaging
    const edition = editionLabel || 'Canadian Rockies Edition';
    const guideUrl = 'https://www.ultimateweddingguide.ca';
    const isVancouver = region === 'vancouver';

    const unlockInstructions = isVancouver
      ? `Visit ${guideUrl}, select the West Coast Edition, and click "The Guide" to enter your code and unlock full access.`
      : `Visit ${guideUrl}, select the Canadian Rockies Edition, and click "The Guide" to enter your code and unlock full access.`;

    const emailBody = isGift === 'true'
      ? `Hi ${recipientName},\n\n${senderName} has gifted you The Ultimate Wedding Guide — ${edition}!\n\n${giftMessage ? `Their message: "${giftMessage}"\n\n` : ''}Your access code is: ${accessCode}\n\n${unlockInstructions}\n\nCongratulations on your engagement!\n\nThe Ultimate Wedding Guide`
      : `Hi ${buyerName},\n\nThank you for purchasing The Ultimate Wedding Guide — ${edition}!\n\nYour access code is: ${accessCode}\n\n${unlockInstructions}\n\nCongratulations on your engagement!\n\nNadia\nThe Ultimate Wedding Guide`;

    // Send email via Resend
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'The Ultimate Wedding Guide <info@ultimateweddingguide.ca>',
          to: [deliveryEmail],
          subject: `Your Ultimate Wedding Guide Access Code`,
          text: emailBody,
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        console.error('Resend error:', err);
      }
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
    }

    // Send owner notification
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'The Ultimate Wedding Guide <info@ultimateweddingguide.ca>',
          to: ['info@ultimateweddingguide.ca'],
          subject: `New Purchase — ${edition}`,
          text: [
            `New purchase received!`,
            ``,
            `Edition: ${edition}`,
            `Buyer: ${buyerName} (${buyerEmail})`,
            isGift === 'true' ? `Gift recipient: ${recipientName} (${recipientEmail})` : null,
            `Access code: ${accessCode}`,
            `Region: ${region || 'rockies'}`,
          ].filter(Boolean).join('\n'),
        }),
      });
    } catch (notifyErr) {
      console.error('Owner notification error:', notifyErr);
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
