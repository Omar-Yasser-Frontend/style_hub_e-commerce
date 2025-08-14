const asyncErrHandler = require("../middlewares/asyncErrHandler");
const { CartService } = require("../models/cart");
const AppError = require("../utils/AppError");

const getCart = asyncErrHandler(async (req, res) => {
  const userId = req.userCookie.userId;
  const cart = await CartService.getUserCart(userId);

  res.json({ success: true, data: cart, code: null });
});

const addToCart = asyncErrHandler(async (req, res) => {
  const userId = req.userCookie.userId;
  const { productId, price, quantity } = req.cartItem;

  const cart = await CartService.addToCart(userId, productId, price, quantity);
  res.json({ success: true, data: cart, code: null });
});

const updateCart = asyncErrHandler(async (req, res) => {
  const userId = req.userCookie.userId;
  const { id, price, quantity } = req.cartItem;

  const cart = await CartService.updateCartItem(userId, id, price, quantity);
  res.json({ success: true, data: cart, code: null });
});

const deleteFromCart = asyncErrHandler(async (req, res) => {
  const userId = req.userCookie.userId;
  const { id } = req.params;
  if (!id) {
    throw new AppError("Cart item ID is required", 400, "MISSING_CART_ITEM_ID");
  }
  const cart = await CartService.deleteFromCart(userId, id);
  res.json({ success: true, data: cart, code: null });
});

const getItemsById = asyncErrHandler(async (req, res) => {
  const cartItems = await CartService.getCartItemsById(req.body);

  res.json({ success: true, data: cartItems, code: null });
});

module.exports = {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
  getItemsById,
};
