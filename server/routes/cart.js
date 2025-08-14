const express = require("express");
const {
  getCart,
  addToCart,
  updateCart,
  deleteFromCart,
  getItemsById,
} = require("../controllers/cart");
const userToken = require("../middlewares/userToken");
const {
  addToCartValidation,
  updateCartValidation,
  deleteCartValidation,
} = require("../middlewares/cartValidation");

const router = express.Router();

router.post("/get-cart-by-id", getItemsById);

router.use(userToken);

router.get("/", getCart);

router.post("/add", addToCartValidation, addToCart);

router.put("/update", updateCartValidation, updateCart);

router.delete("/delete/:id", deleteCartValidation, deleteFromCart);

module.exports = router;
