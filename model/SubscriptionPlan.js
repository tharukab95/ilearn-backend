const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const featureSchema = new Schema(
  {
    name: {
      type: String,
    },
    availabiity: {
      type: Boolean,
    },
  },
  { _id: false }
);

const billingSchema = new Schema(
  {
    name: {
      type: String,
    },
    configurationId: {
      type: String,
    },
  },
  { _id: false }
);

const subscriptionPlan = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    priceId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    identityName: {
      type: String,
    },
    description: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    billingInterval: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    featureList: [featureSchema],
    billingConfigurations: [billingSchema],
    metadata: {
      noOfTutors: {
        type: Number,
        required: true,
      },
      noOfStudents: {
        type: Number,
        required: true,
      },
    },
    productCreated: {
      type: Number,
      required: true,
    },
    productUpdated: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlan);
