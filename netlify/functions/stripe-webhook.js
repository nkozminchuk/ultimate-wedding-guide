const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function sendEmail(to, subject, text) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'The Ultimate Wedding Guide <info@ultimateweddingguide.ca>',
      to: [to],
      subject,
      text,
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    console.error('Resend error:', err);
  }
}

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
      buyerName,
      buyerEmail,
      isGift,
      recipientName,
      recipientEmail,
      senderName,
      giftMessage,
      editionLabel,
      cities,
      region,
    } = session.metadata;

    const deliveryEmail = isGift === 'true' ? recipientEmail : buyerEmail;
    const deliveryName = isGift === 'true' ? recipientName : buyerName;
    const guideUrl = 'https://www.ultimateweddingguide.ca';

    const unlockInstructions = region === 'vancouver'
      ? `Visit ${guideUrl}, select the West Coast Edition, and click "The Guide" to enter your code and unlock full access.`
      : `Visit ${guideUrl}, select the Canadian Rockies Edition, and click "The Guide" to enter your code and unlock full access.`;

    const emailBody = isGift === 'true'
      ? `Hi ${recipientName},\n\n${senderName} has gifted you The Ultimate Wedding Guide — ${editionLabel}!\n\n${giftMessage ? `Their message: "${giftMessage}"\n\n` : ''}Your access code is: ${accessCode}\n\n${unlockInstructions}\n\nCongratulations on your engagement!\n\nThe Ultimate Wedding Guide`
      : `Hi ${buyerName},\n\nThank you for your Ultimate Wedding Guide — ${editionLabel}!\n\nYour access code is: ${accessCode}\n\n${unlockInstructions}\n\nCongratulations on your engagement!\n\nNadia\nThe Ultimate Wedding Guide`;

    try {
      // Customer email
      await sendEmail(deliveryEmail, 'Your Ultimate Wedding Guide Access Code', emailBody);

      // Owner notification
      const ownerBody = [
        `New purchase received!`,
        ``,
        `Edition: ${editionLabel}`,
        `Buyer: ${buyerName} (${buyerEmail})`,
        isGift === 'true' ? `Gift recipient: ${recipientName} (${recipientEmail})` : null,
        `Access code: ${accessCode}`,
        `Region: ${region || 'rockies'}`,
        `Amount: $${(session.amount_total / 100).toFixed(2)} CAD`,
      ].filter(Boolean).join('\n');

      await sendEmail('info@ultimateweddingguide.ca', `New Purchase — ${editionLabel}`, ownerBody);
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
