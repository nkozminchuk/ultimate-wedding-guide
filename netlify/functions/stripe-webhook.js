const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function sendEmail({ to, name, accessCode, isGift, senderName, giftMessage }) {
  const subject = isGift
    ? `You've received The Ultimate Wedding Guide as a gift!`
    : `Your Ultimate Wedding Guide — Access Code Inside`;

  const html = isGift ? `
    <!DOCTYPE html><html><body style="margin:0;padding:0;background:#F7F3EC;font-family:Georgia,serif;">
    <div style="max-width:560px;margin:0 auto;background:#fff;">
      <div style="background:#2C4A3E;padding:48px 40px;text-align:center;">
        <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C4956A;margin:0 0 16px;">A Gift For You</p>
        <h1 style="font-family:Georgia,serif;font-size:36px;font-weight:400;color:#F7F3EC;margin:0;line-height:1.2;">The Ultimate<br/>Wedding Guide</h1>
        <p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#C4956A;margin:16px 0 0;">Canadian Rockies Edition</p>
      </div>
      <div style="padding:48px 40px;">
        <p style="font-size:18px;color:#2C4A3E;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:16px;color:#6B6B6B;line-height:1.7;margin:0 0 24px;"><strong style="color:#2C4A3E;">${senderName}</strong> has gifted you The Ultimate Wedding Guide — Canadian Rockies Edition!</p>
        ${giftMessage ? `<div style="background:#F7F3EC;border-left:3px solid #C4956A;padding:20px 24px;margin:0 0 32px;"><p style="font-size:15px;font-style:italic;color:#6B6B6B;margin:0;">"${giftMessage}"</p><p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;color:#C4956A;margin:8px 0 0;">— ${senderName}</p></div>` : ''}
        <p style="font-size:16px;color:#6B6B6B;line-height:1.7;margin:0 0 32px;">Your guide includes 36 venues across Calgary, Canmore and Banff, along with curated photographers, florists, caterers, bakers, mobile bars, an interactive budget tracker, and a 60-task planning checklist.</p>
        <div style="background:#2C4A3E;border-radius:4px;padding:32px;text-align:center;margin:0 0 32px;">
          <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C4956A;margin:0 0 12px;">Your Access Code</p>
          <p style="font-size:36px;font-weight:700;color:#F7F3EC;letter-spacing:6px;margin:0 0 16px;">${accessCode}</p>
          <p style="font-family:Arial,sans-serif;font-size:11px;color:rgba(247,243,236,0.5);margin:0;">Save this code — you will need it every time you log in</p>
        </div>
        <div style="text-align:center;margin:0 0 40px;">
          <a href="https://www.ultimateweddingguide.ca" style="display:inline-block;background:#C4956A;color:#2C4A3E;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:16px 40px;text-decoration:none;border-radius:2px;">Enter the Guide</a>
        </div>
        <p style="font-size:15px;font-style:italic;color:#6B6B6B;margin:0 0 8px;">Congratulations on your engagement. All the best,</p>
        <p style="font-size:18px;color:#2C4A3E;margin:0;">Nadia</p>
      </div>
      <div style="background:#F7F3EC;padding:24px 40px;text-align:center;border-top:1px solid #D4C5A9;">
        <p style="font-family:Arial,sans-serif;font-size:11px;color:#6B6B6B;margin:0;">The Ultimate Wedding Guide &middot; <a href="mailto:info@ultimateweddingguide.ca" style="color:#C4956A;text-decoration:none;">info@ultimateweddingguide.ca</a></p>
      </div>
    </div></body></html>
  ` : `
    <!DOCTYPE html><html><body style="margin:0;padding:0;background:#F7F3EC;font-family:Georgia,serif;">
    <div style="max-width:560px;margin:0 auto;background:#fff;">
      <div style="background:#2C4A3E;padding:48px 40px;text-align:center;">
        <p style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C4956A;margin:0 0 16px;">Welcome</p>
        <h1 style="font-family:Georgia,serif;font-size:36px;font-weight:400;color:#F7F3EC;margin:0;line-height:1.2;">The Ultimate<br/>Wedding Guide</h1>
        <p style="font-family:Arial,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#C4956A;margin:16px 0 0;">Canadian Rockies Edition</p>
      </div>
      <div style="padding:48px 40px;">
        <p style="font-size:18px;color:#2C4A3E;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:16px;color:#6B6B6B;line-height:1.7;margin:0 0 24px;">Thank you for purchasing The Ultimate Wedding Guide — Canadian Rockies Edition. We are so excited for you to start planning!</p>
        <p style="font-size:16px;color:#6B6B6B;line-height:1.7;margin:0 0 32px;">Your guide includes 36 venues across Calgary, Canmore and Banff, along with curated photographers, florists, caterers, bakers, mobile bars, an interactive budget tracker, and a 60-task planning checklist — everything you need to plan your dream Rocky Mountain wedding.</p>
        <div style="background:#2C4A3E;border-radius:4px;padding:32px;text-align:center;margin:0 0 32px;">
          <p style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#C4956A;margin:0 0 12px;">Your Access Code</p>
          <p style="font-size:36px;font-weight:700;color:#F7F3EC;letter-spacing:6px;margin:0 0 16px;">${accessCode}</p>
          <p style="font-family:Arial,sans-serif;font-size:11px;color:rgba(247,243,236,0.5);margin:0;">Save this code — you will need it every time you log in</p>
        </div>
        <div style="text-align:center;margin:0 0 40px;">
          <a href="https://www.ultimateweddingguide.ca" style="display:inline-block;background:#C4956A;color:#2C4A3E;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:16px 40px;text-decoration:none;border-radius:2px;">Enter the Guide</a>
        </div>
        <p style="font-size:15px;font-style:italic;color:#6B6B6B;margin:0 0 8px;">Congratulations on your engagement. All the best,</p>
        <p style="font-size:18px;color:#2C4A3E;margin:0;">Nadia</p>
      </div>
      <div style="background:#F7F3EC;padding:24px 40px;text-align:center;border-top:1px solid #D4C5A9;">
        <p style="font-family:Arial,sans-serif;font-size:11px;color:#6B6B6B;margin:0;">The Ultimate Wedding Guide &middot; <a href="mailto:info@ultimateweddingguide.ca" style="color:#C4956A;text-decoration:none;">info@ultimateweddingguide.ca</a></p>
      </div>
    </div></body></html>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Nadia at The Ultimate Wedding Guide <info@ultimateweddingguide.ca>',
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
  return res.json();
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
    const { accessCode, buyerName, buyerEmail, isGift, recipientName, recipientEmail, senderName, giftMessage } = session.metadata;

    const deliveryEmail = isGift === 'true' ? recipientEmail : buyerEmail;
    const deliveryName = isGift === 'true' ? recipientName : buyerName;

    try {
      await sendEmail({ to: deliveryEmail, name: deliveryName, accessCode, isGift: isGift === 'true', senderName, giftMessage });
      console.log(`Email sent successfully to ${deliveryEmail}`);
    } catch (emailErr) {
      console.error('Email error:', emailErr.message);
    }
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
