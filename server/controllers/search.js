const asyncErrHandler = require("../middlewares/asyncErrHandler");
const { ProductsServices } = require("../models/products");
const AppError = require("../utils/AppError");

const getSearch = asyncErrHandler(async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  const query = req.query.q;
  if (!query) {
    throw new AppError("Search query is required", 400, "SEARCH_QUERY_MISSING");
  }

  const results = await ProductsServices.searchProducts(query);

  res.json(results);
});

module.exports = {
  getSearch,
};
