const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

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

    try {
      await resend.emails.send({
        from: 'The Ultimate Wedding Guide <info@ultimateweddingguide.ca>',
        to: deliveryEmail,
        subject: 'Your Ultimate Wedding Guide Access Code 🌿',
        html: isGift === 'true'
          ? `
            <p>Hi ${recipientName},</p>
            <p><strong>${senderName}</strong> has gifted you <strong>The Ultimate Wedding Guide — Canadian Rockies Edition</strong>!</p>
            ${giftMessage ? `<p>Their message: <em>"${giftMessage}"</em></p>` : ''}
            <p>Your access code is: <strong style="font-size:1.2em;">${accessCode}</strong></p>
            <p>Visit <a href="https://www.ultimateweddingguide.ca">ultimateweddingguide.ca</a> and click <strong>"The Guide"</strong> to enter your code and unlock full access.</p>
            <p>Congratulations on your engagement! 💍</p>
            <p>— The Ultimate Wedding Guide</p>
          `
          : `
            <p>Hi ${buyerName},</p>
            <p>Thank you for purchasing <strong>The Ultimate Wedding Guide — Canadian Rockies Edition</strong>!</p>
            <p>Your access code is: <strong style="font-size:1.2em;">${accessCode}</strong></p>
            <p>Visit <a href="https://www.ultimateweddingguide.ca">ultimateweddingguide.ca</a> and click <strong>"The Guide"</strong> to enter your code and unlock full access.</p>
            <p>Congratulations on your engagement! 💍</p>
            <p>— Nadia<br>The Ultimate Wedding Guide</p>
          `,
      });
    } catch (emailErr) {
      console.error('Resend email error:', emailErr);
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
