const express = require("express");
const userToken = require("../middlewares/userToken");
const { getOrders, updateOrder } = require("../controllers/orders");
const router = express.Router();

router.use(userToken);

router.get("/", getOrders);

router.put("/:id", updateOrder);

module.exports = router;
