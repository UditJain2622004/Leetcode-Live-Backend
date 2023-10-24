import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  id: {
    type: Number,
  },
  time: {
    type: Number,
  },
  memory: {
    type: Number,
  },
  language_id: {
    type: Number,
  },

  //********************* */
  // solution: {
  //   type: String,
  // },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
