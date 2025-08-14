const asyncErrHandler = require("../middlewares/asyncErrHandler");
const { ProductsServices, ProductModel } = require("../models/products");
const AppError = require("../utils/AppError");
const buildFilter = require("../utils/buildFilter");

const getProducts = asyncErrHandler(async (req, res) => {
  const filter = buildFilter(req.query);

  let { products, productsLength } = await ProductsServices.getAllProducts(
    filter,
    Number(req.query.page)
  );

  res.json({
    products,
    productsLength,
    maxPrice: Math.max(...products.map((prod) => prod.price)),
  });
});

const getProduct = asyncErrHandler(async (req, res) => {
  const product = await ProductsServices.getProductById(Number(req.params.id));

  if (!product) return new AppError("Product not found", 404);

  res.json(product);
});

const getAllProductsId = asyncErrHandler(async (req, res) => {
  const products = await ProductsServices.getAllProductsIds();

  res.json({ status: "success", data: products });
});

module.exports = {
  getProducts,
  getProduct,
  getAllProductsId,
};
