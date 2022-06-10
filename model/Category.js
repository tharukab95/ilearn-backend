const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "published",
      enum: ["draft", "published", "archive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
