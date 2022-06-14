import { nativeEnum, object, string, TypeOf } from "zod";
import config from "config";
import { IUser } from "../models/user.model";

const userSchema = {
  user: {
    create: object({
      body: object({
        username: string({
          required_error: "Username is required",
        })
          .min(3, { message: "Must be 3 or more characters long" })
          .max(30, { message: "Must be 30 or fewer characters long" }),
        firstName: string({
          required_error: "First name is required",
        }),
        lastName: string({
          required_error: "Last name is required",
        }),
        email: string({
          required_error: "Email is required",
        }).email("Not a valid email"),
        phone: string().regex(
          new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"),
          { message: "Not a valid phone number" }
        ),
        // roles: object(config.get("userRoles")).optional(),
        password: string().regex(
          // At least one special character, (?=.*?[#?!@$%^&*-])
          // Minimum eight in length .{8,} (with the anchors)
          new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          ),
          {
            message:
              "Must have minimum eight characters, at least one letter in simple and capital , one number and one special character",
          }
        ),
      }),
    }),
  },
};

export default userSchema;
