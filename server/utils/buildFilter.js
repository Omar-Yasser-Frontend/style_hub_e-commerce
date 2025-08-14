const CATEGORY = {
  "men's": ["mens-shirts", "mens-shoes", "mens-watches", "sunglasses"],
  "women's": [
    "skin-care",
    "tops",
    "sunglasses",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-jewellery",
    "womens-watches",
  ],
};

function buildFilter(query) {
  const filter = {};

  if (query.category) {
    const categoriesList = [];
    query.category.split(",").forEach((group) => {
      if (CATEGORY[group]) categoriesList.push(...CATEGORY[group]);
    });
    if (categoriesList.length) {
      filter.category = { $in: categoriesList };
    }
  }

  if (query.price) {
    const [min, max] = query.price.split(",").map(Number);
    filter.price = { $gte: min, $lte: max };
  }

  if (query.rating) {
    filter.rating = { $gte: Number(query.rating) };
  }

  return filter;
}

module.exports = buildFilter;
