const asyncErrHandler = require("../middlewares/asyncErrHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.ENDPOINT_WEBHOOK_SECRET;

const { OrderService } = require("../models/order");

const postWebhook = asyncErrHandler(async (req, res) => {
  console.log("Webhook is processing...");
  let event = req.body;

  if (endpointSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      console.log(paymentIntent.metadata);
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      const { userId, email, cart } = paymentIntent.metadata || {};
      if (!userId || !cart) {
        console.log("Missing userId or cart in payment metadata.");
        break;
      }
      let cartItems = JSON.parse(cart);
      await OrderService.createOrderFromWebhook({
        userId,
        email,
        items: cartItems,
        paymentIntent,
      });
      console.log("Order created successfully.");
      break;
    }
    case "payment_intent.payment_failed":
      console.log("Failed to make process a payment");
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
      break;
  }

  res.status(200).send();
});

module.exports = {
  postWebhook,
};
