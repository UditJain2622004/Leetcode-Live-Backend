import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name given!! Name required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "No email given!! email required"],
    unique: true,
    lowercase: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please provide a valid email",
    ],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  password: {
    type: String,
    required: [true, "No password given"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },

  //************* */
  // rank: {
  //   type: Number,
  // },
});

/**a pre-save hook to encrypt password */
userSchema.pre("save", async function (next) {
  // if `password` field is not modified, return
  if (!this.isModified("password")) return next();

  // encrypts the password
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

/** Compares 2 passwords */
userSchema.methods.comparePassword = async function (
  enteredPassword,
  Password
) {
  return await bcrypt.compare(enteredPassword, Password);
};

const User = mongoose.model("User", userSchema);

export default User;
