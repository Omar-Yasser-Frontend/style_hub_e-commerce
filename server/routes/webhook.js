const express = require("express");
const { postWebhook } = require("../controllers/webhook");
const router = express.Router();

router.post("/", express.raw({ type: "application/json" }), postWebhook);

module.exports = router;
