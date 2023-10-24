import express from "express";
import * as userController from "./../controllers/userController.js";

const Router = express.Router();

Router.route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

Router.route("/:id")
  .get(userController.getUserById)
  .delete(userController.deleteUserById)
  .patch(userController.updateUserById);

export default Router;
