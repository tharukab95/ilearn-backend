const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      required: true,
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
