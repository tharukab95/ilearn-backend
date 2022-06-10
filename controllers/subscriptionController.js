const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const SubscriptionPlan = require('../model/SubscriptionPlan');

const DOMAIN_URL = process.env.DOMAIN_URL;

const createCheckoutSession = async (req, res) => {
  console.log('went');
  const { subscriptionPlan } = req.body;
  console.log(subscriptionPlan);
  try {
    const myPlan = await SubscriptionPlan.findOne({
      identityName: subscriptionPlan,
    });
    const session = await stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: myPlan.priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${DOMAIN_URL}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN_URL}/membership?canceled=true`,
    });

    res.status(200).json(session);
  } catch (err) {
    console.log(err);
  }
};

// const createPortalSession = async (req, res) => {
//   // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
//   // Typically this is stored alongside the authenticated user in your database.
//   const { session_id } = req.body;
//   const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

//   // This is the url to which the customer will be redirected when they are done
//   // managing their billing with the portal.
//   const returnUrl = `${DOMAIN_URL}/membership`;

//   const portalSession = await stripe.billingPortal.sessions.create({
//     customer: checkoutSession.customer,
//     return_url: returnUrl,
//   });

//   res.redirect(303, portalSession.url);
// };

// const webhook = (request, response) => {
//   const event = request.body;

//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
//   if (endpointSecret) {
//     const signature = request.headers['stripe-signature'];
//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         signature,
//         endpointSecret
//       );
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return response.sendStatus(400);
//     }
//   }
//   let subscription;
//   let status;
//   // Handle the event
//   switch (event.type) {
//     case 'customer.subscription.trial_will_end':
//       subscription = event.data.object;
//       status = subscription.status;
//       console.log(`Subscription status is ${status}.`);
//       // Then define and call a method to handle the subscription trial ending.
//       // handleSubscriptionTrialEnding(subscription);
//       break;
//     case 'customer.subscription.deleted':
//       subscription = event.data.object;
//       status = subscription.status;
//       console.log(`Subscription status is ${status}.`);
//       // Then define and call a method to handle the subscription deleted.
//       // handleSubscriptionDeleted(subscriptionDeleted);
//       break;
//     case 'customer.subscription.created':
//       subscription = event.data.object;
//       status = subscription.status;
//       console.log(`Subscription status is ${status}.`);
//       // Then define and call a method to handle the subscription created.
//       // handleSubscriptionCreated(subscription);
//       break;
//     case 'customer.subscription.updated':
//       subscription = event.data.object;
//       status = subscription.status;
//       console.log(`Subscription status is ${status}.`);
//       // Then define and call a method to handle the subscription update.
//       // handleSubscriptionUpdated(subscription);
//       break;
//     default:
//       // Unexpected event type
//       console.log(`Unhandled event type ${event.type}.`);
//   }
//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// };

module.exports = { createCheckoutSession };
