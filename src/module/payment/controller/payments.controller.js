import { asyncHandler } from '../../../services/asyncHandler.js';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MxafiDlUdQmc698VshMfXJCYCDQDeH1jggtJnJhB5tI4lSDnDhrzHgxiTlSYw16LQB7vCNnMX88hvhOLsDn4UiY00SY4YxfoZ');

export const proceedPayment = asyncHandler(async (req, res, next) => {
    // try {
    let stripeToken = req.body.token
    let amount = req.body.amount

    stripe.customers.create({
        email: stripeToken.email,
        source: stripeToken.id
    }).then((customer) => {
        return stripe.charges.create({
            amount: amount,
            description: 'buying a service',
            currency: "USD",
            customer: customer.id
        });
    })
    .then((charge) => {
        res.json({ data: "success" })
    })
    .catch((err) => {
        console.log(err);
        res.json({ data: "failure" })
    })
})  

