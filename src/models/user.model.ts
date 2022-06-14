import { Document, model, Schema } from "mongoose";

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  address?: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  phoneVerified: boolean;
  roles?: object;
  password: string;
  stripeId?: string;
  refreshToken?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
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
    stripeId: {
      type: String,
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);
export default User;

// export default User;
