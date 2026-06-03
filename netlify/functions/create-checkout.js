const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Generate a unique access code
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = [4, 4, 4];
  return segments.map(len =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  ).join('-');
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
