const { default: mongoose } = require("mongoose");
const AppError = require("../utils/AppError");
const { ProductModel } = require("./products");
const { TypeFormatFlags } = require("typescript");

const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
cartItemSchema.index({ userId: 1, productId: 1 }, { unique: true });

const CartModel = mongoose.model("cart", cartItemSchema);

class CartService {
  static async getUserCart(userId) {
    const cartItems = await CartModel.find({ userId }).select(
      "productId price quantity"
    );

    return cartItems.map((item) => ({
      id: item.productId,
      price: item.price,
      quantity: item.quantity,
    }));
  }
  static async addToCart(userId, productId, price, quantity = 1) {
    const existingItem = await CartModel.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartModel.create({
        userId,
        productId,
        price,
        quantity,
      });
    }

    return await this.getUserCart(userId);
  }

  static async updateCartItem(userId, productId, price, quantity) {
    const cartItem = await CartModel.findOne({ userId, productId });

    if (!cartItem) {
      throw new AppError("Item not found in cart", 404, "ITEM_NOT_FOUND");
    }

    cartItem.price = price;
    cartItem.quantity = quantity;
    await cartItem.save();

    return await this.getUserCart(userId);
  }

  static async deleteFromCart(userId, productId) {
    const result = await CartModel.deleteOne({
      userId,
      productId: parseInt(productId),
    });

    if (result.deletedCount === 0) {
      throw new AppError("Item not found in cart", 404, "ITEM_NOT_FOUND");
    }
    return await this.getUserCart(userId);
  }

  static async itemExists(userId, productId) {
    const item = await CartModel.findOne({ userId, productId });
    return !!item;
  }

  static async getCartItem(userId, productId) {
    return await CartModel.findOne({ userId, productId });
  }

  static async getCartItemsById(cart) {
    const products = await ProductModel.find({
      id: { $in: cart.map((item) => item.id) },
    })
      .select({
        id: 1,
        title: 1,
        price: 1,
        thumbnail: 1,
      })
      .lean();

    const cartItems = cart.map((item, idx) => ({
      ...item,
      product:
        products?.[idx].id === item.id
          ? products?.[idx]
          : products.find((prod) => prod.id === item.id),
    }));

    return cartItems;
  }
}

module.exports = { CartModel, CartService };
