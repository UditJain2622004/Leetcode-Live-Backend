import express from "express";

import * as authController from "./../controllers/authController.js";

const Router = express.Router();

Router.route("/signup").post(authController.signup);
Router.route("/login").post(authController.login);
Router.route("/logout").get(authController.logout);

export default Router;
