const { default: mongoose } = require("mongoose");
const AppError = require("../utils/AppError");

const orderItemSchema = new mongoose.Schema(
  {
    id: {
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
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

class OrderService {
  static async createOrder(
    userId,
    items,
    totalAmount,
    shippingAddress,
    paymentInfo = {}
  ) {
    const order = await OrderModel.create({
      userId,
      items,
      totalAmount,
      shippingAddress,
      paymentInfo,
    });
    return order;
  }

  static async createOrderFromWebhook({ userId, email, items, paymentIntent }) {
    const { id: paymentIntentId, amount } = paymentIntent;
    return await OrderModel.create({
      userId,
      email,
      items,
      status: "paid",
      paymentIntentId,
      totalAmount: amount,
    });
  }

  static async getUserOrders(userId) {
    return await OrderModel.find({ userId }).sort({ createdAt: -1 });
  }

  static async getOrderById(orderId) {
    return await OrderModel.findById(orderId);
  }

  static async updateOrderStatus({ orderId, userId }, status) {
    const order = await OrderModel.findOneAndUpdate(
      { _id: orderId, userId },
      { status },
      { new: true }
    );
    if (!order) throw new AppError("Order not found", 404);

    return order;
  }
}

module.exports = { OrderModel, OrderService };
