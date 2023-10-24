import express from "express";
import * as questionController from "./../controllers/questionController.js";

const Router = express.Router();

Router.route("/")
  .get(questionController.getAllQuestions)
  .post(questionController.addQuestion);

Router.route("/submit/:id").post(questionController.submitQuestion);
Router.route("/:id")
  .get(questionController.getQuestion)
  .delete(questionController.deleteQuestion);

export default Router;
