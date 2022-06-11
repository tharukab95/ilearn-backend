import { Document, model, Schema } from "mongoose";

export interface UserDocument extends Document {
  userName: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  email: string;
  emailVerified: boolean;
  phone?: string;
  phoneVerified: boolean;
  roles?: number;
  password: string;
  stripeId?: string;
  refreshToken?: string[];
  createdAt: Date;
  updatedAt: Date;
}

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
