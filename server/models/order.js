const { default: mongoose } = require("mongoose");
const AppError = require("../utils/AppError");
const { ProductModel } = require("./products");

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
      totalAmount: (amount / 100).toFixed(2),
    });
  }
  static async getUserOrders(userId) {
    const orders = await OrderModel.find({ userId })
      .sort({
        createdAt: -1,
      })
      .lean();

    const orderIds = orders
      .map((order) => order.items)
      .map((item) => {
        return item.map((i) => i.id);
      })
      .flat();

    const products = await ProductModel.find({ id: { $in: orderIds } })
      .select({ id: 1, title: 1 })
      .lean();

    const orderIdsMap = new Map(products.map((item) => [item.id, item.title]));

    const ordersWithTitle = orders.map((order) => ({
      ...order,
      items: order.items.map((item) => ({
        ...item,
        title: orderIdsMap.get(item.id) || "unknown",
      })),
    }));

    return ordersWithTitle;
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
    if (!order) throw new AppError2("Order not found", 404);
    return order;
  }
};

module.exports = { OrderModel, OrderService };
