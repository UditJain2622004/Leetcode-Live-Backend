import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/** Sign a jsonwebtoken */
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * Creates a jsonwebtoken, creates a cookie and attach the jwt to it and sends the cookie along with response
 */
const createSendToken = (user, statusCode, res) => {
  try {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      domain: "localhost",
    };

    res.cookie("jwt", token, cookieOptions);

    // so that password is not sent in the response
    user.password = undefined;

    res.status(statusCode).json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/** Creates a new user document */
export const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**Logs the user in */
export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // 1) Check if email & password are given in request
    if (!req.body.email || !req.body.password) {
      throw new Error("Please provide email and password.");
    }
    // 2) Check if user exists & password is correct
    const user = await User.findOne({ email: email }).select("+password");

    // 3) Compare passwords
    if (!user || !(await user.comparePassword(password, user.password))) {
      throw new Error("Incorrect email or password!!");
    }

    // 4) If everything is fine, log the user in
    createSendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

/**Logs the user out */
export const logout = (req, res, next) => {
  // reset the jwt cookie to empty string and expiry date of right now
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
  });
};
