const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  reviewerEmail: {
    type: String,
    required: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  images: [
    {
      type: String,
    },
  ],
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingInformation: {
      type: String,
      required: true,
    },
    availabilityStatus: {
      type: String,
      required: true,
      enum: ["in_stock", "out_of_stock", "discontinued", "pre_order"],
    },
    reviews: [reviewSchema],
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.index({ description: "text" });
productSchema.index({ title: "text" });
productSchema.index({ price: 1, id: 1 });

const ProductModel = mongoose.model("Product", productSchema);

class ProductsServices {
  static async getAllProducts(filter, page = 1) {
    const products = ProductModel.find(filter).limit(10);
    const productsLength = await ProductModel.find(filter).countDocuments();
    if (page > 1) products.skip((page - 1) * 10);

    return {
      products: await products,
      productsLength,
    };
  }

  static async getAllProductsIds() {
    const products = await ProductModel.find().select({ _id: 0, id: 1 }).lean();

    return products;
  }

  static async searchProducts(query) {
    const products = await ProductModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
      .limit(10)
      .select({ title: 1, price: 1, thumbnail: 1, id: 1 });

    return products;
  }

  static async getProductById(id) {
    const product = await ProductModel.findOne({ id });

    return product;
  }
}

module.exports = { ProductModel, ProductsServices };
