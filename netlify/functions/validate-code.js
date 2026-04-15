const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { code } = JSON.parse(event.body);
    
    if (!code) {
      return { statusCode: 400, body: JSON.stringify({ valid: false }) };
    }

    // Check master password first
    if (code.toLowerCase() === process.env.MASTER_PASSWORD) {
      return { statusCode: 200, body: JSON.stringify({ valid: true }) };
    }

    // Search Stripe for a completed checkout session with this access code
    const sessions = await stripe.checkout.sessions.list({ limit: 100 });
    
    const match = sessions.data.find(session => 
      session.metadata?.accessCode === code.toUpperCase() &&
      session.payment_status === 'paid'
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: !!match }),
    };
  } catch (err) {
    console.error('Validation error:', err);
    return { statusCode: 500, body: JSON.stringify({ valid: false }) };
  }
};
