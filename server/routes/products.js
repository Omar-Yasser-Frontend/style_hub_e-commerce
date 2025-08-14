const express = require("express");
const {
  getProducts,
  getProduct,
  getAllProductsId,
} = require("../controllers/products");
const asyncErrHandler = require("../middlewares/asyncErrHandler");

const router = express.Router();

router.get("/get-ids", getAllProductsId);

router.get("/", getProducts);

router.get("/:id", getProduct);

module.exports = router;
