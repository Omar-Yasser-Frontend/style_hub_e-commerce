const asyncErrHandler = require("../middlewares/asyncErrHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const { CartService } = require("../models/cart");
const AppError = require("../utils/AppError");

const getPaymentIntent = asyncErrHandler(async (req, res) => {
  const { email, userId } = req.userCookie;
  const cart = await CartService.getUserCart(userId);

  if (!cart || cart.length === 0) {
    throw new AppError("Cart is empty", 400, "EMPTY_CART");
  }
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const amount = Math.round(total * 100); 

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    metadata: {
      email,
      userId,
      cart: JSON.stringify(cart),
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const client_secret = paymentIntent.client_secret;
  res.json({ client_secret });
});

module.exports = {
  getPaymentIntent,
};
