import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();
import { v4 as uuid } from "uuid";

import generateJWT from "./helpers/generateJWT.js";
import sendEmail from "./helpers/mailer.js";
import hashPassword from "./helpers/hashPassword.js";
import comparePasswords from "./helpers/comparePasswords.js";

const userSchema = Joi.object().keys({
  username: Joi.string().required().min(4),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

class UsersController {
  greetUser(req, res) {
    const user = req.body.username;
    res.send(`Hello ${user}`);
  }

  async signup(req, res) {
    try {
      const result = userSchema.validate(req.body);
      if (result.error) {
        console.log(result.error.message);
        return res.status(400).json({
          error: true,
          status: 400,
          message: result.error.message,
        });
      }

      let user = await User.findOne({
        email: result.value.email,
      });

      if (user) {
        return res.json({
          error: true,
          status: 400,
          message: "Email is already in use",
        });
      }

      const hash = await hashPassword(result.value.password);

      const id = uuid();
      result.value.userId = id;

      delete result.value.confirmPassword;
      result.value.password = hash;

      let code = Math.floor(100000 + Math.random() * 900000);
      let expiry = Date.now() + 60 * 1000 * 15;

      const sendCode = await sendEmail(result.value.email, code);

      if (sendCode.error) {
        return res.status(500).json({
          error: true,
          message: "Couldn't send verification email.",
        });
      }
      result.value.emailToken = code;
      result.value.emailTokenExpires = new Date(expiry);
      const newUser = new User(result.value);
      await newUser.save();

      return res.status(200).json({
        success: true,
        message: "Registration Success",
      });
    } catch (error) {
      console.error("signup-error", error);
      return res.status(500).json({
        error: true,
        message: "Cannot Register",
      });
    }
  }
}

export default UsersController;
