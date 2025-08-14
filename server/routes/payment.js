const express = require("express");
const { getPaymentIntent } = require("../controllers/payment");
const userToken = require("../middlewares/userToken");
const router = express.Router();

router.get("/intent", userToken, getPaymentIntent);

module.exports = router;
