const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      default: "item",
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    inventory: {
      type: Number,
      default: 0,
      required: true,
    },
    brand: {
      type: String,
    },
    merchant: {
      type: String,
    },
    rating: {
      type: Number,
      defaul: 0,
    },
    status: {
      type: String,
      default: "draft",
      enum: ["draft", "published", "archive"],
    },
    tags: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
