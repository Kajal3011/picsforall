const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

//Payment gateway integration
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

router.post('/', requireAuth, async (req, res) => {
    try {
        // console.log('post req in server successful')
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'PicsForAll plus subscription',
                    },
                    unit_amount: 9900,
                },
                quantity: 1,
            }],

            success_url: 'https://picsforall.netlify.app/',
            cancel_url: 'https://picsforall.netlify.app/plus',
        })
        res.json({ url: session.url })

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = router