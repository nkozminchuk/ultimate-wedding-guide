const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Generate a unique access code
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = [4, 4, 4];
  return segments.map(len =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  ).join('-');
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, name, isGift, recipientName, recipientEmail, senderName, message } = JSON.parse(event.body);

    const accessCode = generateCode();

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: isGift ? recipientEmail : email,
      metadata: {
        accessCode,
        buyerName: name || senderName || '',
        buyerEmail: email || '',
        isGift: isGift ? 'true' : 'false',
        recipientName: recipientName || '',
        recipientEmail: recipientEmail || '',
        senderName: senderName || '',
        giftMessage: message || '',
      },
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'The Ultimate Wedding Guide — Canadian Rockies Edition',
              description: 'Full vendor directory, budget guide, budget tracker & 60-task planning checklist. Calgary, Canmore & Banff.',
              images: ['https://www.ultimateweddingguide.ca/og-image.jpg'],
            },
            unit_amount: 2900, // $29.00 CAD in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL}/success?code=${accessCode}&name=${encodeURIComponent(recipientName || name || '')}`,
      cancel_url: `${process.env.URL}`,
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
