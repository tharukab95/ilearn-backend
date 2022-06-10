const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItem = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      default: "item",
    },
    subTotal: {
      type: Number,
      default: 0,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

module.exports = CartItem;
