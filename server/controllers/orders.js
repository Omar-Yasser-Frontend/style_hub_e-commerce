const asyncErrHandler = require("../middlewares/asyncErrHandler");
const { OrderService } = require("../models/order");
const AppError = require("../utils/AppError");

const getOrders = asyncErrHandler(async (req, res) => {
  const userId = req.userCookie.userId;

  const orders = await OrderService.getUserOrders(userId);
  res.json(orders || []);
});

const updateOrder = asyncErrHandler(async (req, res) => {
  const { orderId } = req.params;
  const { userId } = req.userCookie;
  const { status } = req.body;
  const ordersStatus = ["pending", "paid", "shipped", "delivered", "cancelled"];

  if (!ordersStatus.includes(status)) {
    throw new AppError("Invalid status update", 400);
  }

  const order = await OrderService.updateOrderStatus(
    { orderId, userId },
    status
  );

  res.json(order);
});

module.exports = {
  getOrders,
  updateOrder,
};
