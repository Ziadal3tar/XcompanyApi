// This is your test secret API key.
import stripe from 'stripe'
stripe('pk_test_51MxafiDlUdQmc698VQdKpvuamiY2xVoxKxhSnFad3hsxaBVSzZzGemOqvfUvnLQfp0HdPsNRBSrLUdeGDKCwDtSv0019vVzzac');
import express from 'express'
const app = express();
app.use(express.static('public'));

const MY_DOMAIN = 'http://localhost:4200';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${MY_DOMAIN}/success.html`,
    cancel_url: `${MY_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});