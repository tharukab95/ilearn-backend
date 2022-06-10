const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItem = require("./CartItem");

const orderSchema = new Schema(
  {
    customer: {
      id: {
        type: String,
        required: true,
      },
      uid: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    orderLocation: {
      longitude: {
        type: Number,
      },
      latitude: {
        type: Number,
      },
      heading: {
        type: Number,
      },
      accuracy: {
        type: Number,
      },
    },
    billingAddress: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "PLACED",
      enum: [
        "PLACED",
        "ACCEPTED",
        "READY",
        "DISPATCHED",
        "COMPLETED",
        "CANCELED",
      ],
    },
    cart: {
      type: [CartItem],
      required: true,
    },
    total: {
      type: Number,
      default: 0.0,
      required: true,
    },
    merchantName: {
      type: String,
    },
    collectionPoint: {
      longitude: {
        type: Number,
      },
      latitude: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
