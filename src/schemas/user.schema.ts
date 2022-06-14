import Joi from "joi";
import config from "config";
import { IUser } from "../models/user.model";

const userSchema = {
  user: {
    create: Joi.object<IUser>({
      username: Joi.string().alphanum().min(3).max(30).required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().regex(
        new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$")
      ),
      roles: Joi.object(config.get("userRoles")),
      password: Joi.string()
        .regex(
          // At least one upper case English letter, (?=.*?[A-Z])
          // At least one lower case English letter, (?=.*?[a-z])
          // At least one digit, (?=.*?[0-9])
          // At least one special character, (?=.*?[#?!@$%^&*-])
          // Minimum eight in length .{8,} (with the anchors)
          new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          )
        )
        .required(),
    }),
  },
};

export default userSchema;
