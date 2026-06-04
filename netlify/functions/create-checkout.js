const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Generate a unique access code
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = [4, 4, 4];
  return segments.map(len =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  ).join('-');
}

// Send email via Resend
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

// Region-specific content
const regionConfig = {
  vancouver: {
    productName: 'The Ultimate Wedding Guide — West Coast Edition',
    description: 'Full vendor directory, budget guide, budget tracker & 60-task planning checklist. Vancouver, Squamish, Whistler & Pemberton.',
    image: 'https://www.ultimateweddingguide.ca/og-image.jpg',
    editionLabel: 'West Coast Edition',
    cities: 'Vancouver, Squamish, Whistler & Pemberton',
    successPath: '/success?region=vancouver',
  },
  rockies: {
    productName: 'The Ultimate Wedding Guide — Canadian Rockies Edition',
    description: 'Full vendor directory, budget guide, budget tracker & 60-task planning checklist. Calgary, Canmore & Banff.',
    image: 'https://www.ultimateweddingguide.ca/og-image.jpg',
    editionLabel: 'Canadian Rockies Edition',
    cities: 'Calgary, Canmore & Banff',
    successPath: '/success?region=rockies',
  },
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, name, isGift, recipientName, recipientEmail, senderName, message, region } = JSON.parse(event.body);

    // Default to rockies if no region specified
    const config = regionConfig[region] || regionConfig.rockies;

    const accessCode = generateCode();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: isGift ? recipientEmail : email,
      metadata: {
        accessCode,
        region: region || 'rockies',
        buyerName: name || senderName || '',
        buyerEmail: email || '',
        isGift: isGift ? 'true' : 'false',
        recipientName: recipientName || '',
        recipientEmail: recipientEmail || '',
        senderName: senderName || '',
        giftMessage: message || '',
        editionLabel: config.editionLabel,
        cities: config.cities,
      },
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: config.productName,
              description: config.description,
              images: [config.image],
            },
            unit_amount: 2900, // $29.00 CAD in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL}${config.successPath}&code=${accessCode}&name=${encodeURIComponent(recipientName || name || '')}`,
      cancel_url: `${process.env.URL}`,
      allow_promotion_codes: true,
    });

    // If a 100% promo code is applied, Stripe marks the session amount_total as 0
    // and the webhook may not fire — so we send emails directly here.
    try {
      const retrieved = await stripe.checkout.sessions.retrieve(session.id);
      if (retrieved.amount_total === 0) {
        const deliveryEmail = isGift ? recipientEmail : email;
        const deliveryName = isGift ? recipientName : (name || senderName || '');
        const guideUrl = 'https://www.ultimateweddingguide.ca';
        const isVancouver = region === 'vancouver';

        const unlockInstructions = isVancouver
          ? `Visit ${guideUrl}, select the West Coast Edition, and click "The Guide" to enter your code and unlock full access.`
          : `Visit ${guideUrl}, select the Canadian Rockies Edition, and click "The Guide" to enter your code and unlock full access.`;

        const emailBody = isGift
          ? `Hi ${recipientName},\n\n${senderName} has gifted you The Ultimate Wedding Guide — ${config.editionLabel}!\n\n${message ? `Their message: "${message}"\n\n` : ''}Your access code is: ${accessCode}\n\n${unlockInstructions}\n\nCongratulations on your engagement!\n\nThe Ultimate Wedding Guide`
          : `Hi ${deliveryName},\n\nThank you for your Ultimate Wedding Guide — ${config.editionLabel}!\n\nYour access code is: ${accessCode}\n\n${unlockInstructions}\n\nCongratulations on your engagement!\n\nNadia\nThe Ultimate Wedding Guide`;

        // Customer email
        await sendEmail(deliveryEmail, 'Your Ultimate Wedding Guide Access Code', emailBody);

        // Owner notification
        const ownerBody = [
          `New purchase received (100% promo code applied)!`,
          ``,
          `Edition: ${config.editionLabel}`,
          `Buyer: ${name || senderName} (${email})`,
          isGift ? `Gift recipient: ${recipientName} (${recipientEmail})` : null,
          `Access code: ${accessCode}`,
          `Region: ${region || 'rockies'}`,
        ].filter(Boolean).join('\n');

        await sendEmail('info@ultimateweddingguide.ca', `New Purchase (Free/Promo) — ${config.editionLabel}`, ownerBody);
      }
    } catch (freeOrderErr) {
      console.error('Free order email error:', freeOrderErr);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
