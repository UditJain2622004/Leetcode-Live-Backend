import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  statement: {
    type: String,
  },
  examples: {
    type: [Array],
  },
  testCases: Object,
  constraints: {
    type: [String],
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  tags: {
    type: [String],
  },
  // answers: {
  //   type: [String],
  // },

  // likes: {
  //   type: Number,
  // },
  // solution: {
  //   type: String,
  // },
  // number: {
  //   type: Number,
  // },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
