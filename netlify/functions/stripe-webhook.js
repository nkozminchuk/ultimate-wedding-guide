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
      buyerName,
      buyerEmail,
      isGift,
      recipientName,
      recipientEmail,
      senderName,
      giftMessage,
    } = session.metadata;

    const deliveryEmail = isGift === 'true' ? recipientEmail : buyerEmail;
    const deliveryName = isGift === 'true' ? recipientName : buyerName;

    // Send email via Formspree
    try {
      await fetch('https://formspree.io/f/mykbkojw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          inquiry_type: 'purchase_complete',
          recipient_name: deliveryName,
          recipient_email: deliveryEmail,
          access_code: accessCode,
          is_gift: isGift,
          sender_name: senderName || '',
          gift_message: giftMessage || '',
          subject: `Your Ultimate Wedding Guide Access Code`,
          message: isGift === 'true'
            ? `Hi ${recipientName},\n\n${senderName} has gifted you The Ultimate Wedding Guide — Canadian Rockies Edition!\n\n${giftMessage ? `Their message: "${giftMessage}"\n\n` : ''}Your access code is: ${accessCode}\n\nVisit https://www.ultimateweddingguide.ca and click "The Guide" to enter your code and unlock full access.\n\nCongratulations on your engagement!\n\nThe Ultimate Wedding Guide`
            : `Hi ${buyerName},\n\nThank you for purchasing The Ultimate Wedding Guide — Canadian Rockies Edition!\n\nYour access code is: ${accessCode}\n\nVisit https://www.ultimateweddingguide.ca and click "The Guide" to enter your code and unlock full access.\n\nCongratulations on your engagement!\n\nNadia\nThe Ultimate Wedding Guide`,
        }),
      });
    } catch (emailErr) {
      console.error('Email send error:', emailErr);
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
