import mongoose from "mongoose";
import User from "./../models/userModel.js";
import Submission from "./../models/submissionModel.js";

/** @param { object } obj - the object from which fields are to be removed
 * @param { array } allowedFields - an array of fields that should be kept
 * @returns { object } `newObj` - an object with only the fields which are in `allowedFields`
 *
 * Remove fields from `obj` which are not in `allowedFields`
 */
const filterObj = (obj, allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

/**
  * @param { Array } submissions - An array of all the accepted submissions of the user
  * @returns { object } stats - An object containing the number of `easy`, `medium` and `hard` question solved by the user
  
  */
const calculate_stats = (submissions) => {
  const stats = { easy: 0, medium: 0, hard: 0 };
  submissions.forEach((el) => {
    stats[el.question.difficulty.toLowerCase()] += 1;
  });
  return stats;
};

/**Get all users from the database */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      results: users.length,
      data: {
        users: users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

/**Create a new User document */
export const createUser = async (req, res, next) => {
  try {
    //prettier-ignore
    let details = filterObj(req.body, ["name","email","password","passwordConfirm",]);
    const newUser = await User.create(details);

    // so that password is not sent in the response
    newUser.password = undefined;

    res.status(201).json({
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

/**Get all details about a specific user from the database */
export const getUserById = async (req, res, next) => {
  try {
    // get the user from database
    let user = await User.findById(req.params.id).select("name email").lean();

    // Get all the `Accepted` submissions made by the user
    let submissions = await Submission.find({
      user: new mongoose.Types.ObjectId(req.params.id),
      id: 3,
    })
      .populate({
        //populate the `question` field of `submission` docs
        path: "question",
        select: "title difficulty tags",
      })
      .select("-__v -user -description")
      .lean();

    // Remove duplicate Accpeted submissions of a question by the user
    const uniqueQuestionIds = Array.from(
      new Set(submissions.map((item) => item.question))
    );
    const uniqueQuestions = uniqueQuestionIds.map((id) => {
      return submissions.find((item) => item.question === id);
    });

    // Calculate statistics (No. of easy, medium, hard question solved)
    const stats = calculate_stats(uniqueQuestions);

    // set the submissions and stats property on `user` object
    user.stats = stats;
    user.submissions = uniqueQuestions;

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

/**Update `name` or `email` of a user */
export const updateUserById = async (req, res, next) => {
  try {
    let updates = filterObj(req.body, ["name", "email"]);
    updates.updated = Date.now();
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

/**Delete a user from database */
export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};
