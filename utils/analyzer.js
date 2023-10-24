import Submission from "../models/submissionModel.js";

/**
 * @param { array } accepted_submissions - an array of all the `Accepted` submissions of a question
 * @param { Number } time_taken - time taken by current submission
 * @param { Number } memory_used - memory used by current submission
 * @returns { object }  an object containing `time_status` and `memory_status` of the current submission.
 * @description
 * Loops over the array of all `Accpeted` submissions and calculates the number of submissions the current submission betters, in terms of time and memory
 */
const calc_performance = (accepted_submissions, time_taken, memory_used) => {
  let time_count = 0;
  let memory_count = 0;
  for (let i = 0; i < accepted_submissions.length; i++) {
    if (time_taken * 1 <= accepted_submissions[i].time) time_count += 1;
    if (memory_used * 1 <= accepted_submissions[i].memory) memory_count += 1;
  }
  const time_status = (time_count / accepted_submissions.length) * 100 || 100;
  const memory_status =
    (memory_count / accepted_submissions.length) * 100 || 100;
  return { time_status, memory_status };
};

/**
 * @param { array } results - an array of results returned by execution engine
 * @param { Number } language_id - `language_id` of language used to solve the question
 * @param { Number } question_id - id of the question solved
 * @returns { object }  a response object containing details about the submission
 */
export const check_answer = async (results, language_id, question_id) => {
  let correct = 0;
  let response;
  for (const result in results) {
    const el = results[result];
    if (el.status.id == 3) {
      correct = correct + 1;
      continue;
    } else {
      // if any test case failed, send error response
      let { message, compile_output, stderr, stdout } = el;
      response = {
        success: false,
        total_cases: results.length,
        passed_cases: correct,
        description: el.status.description,
        id: el.status.id,
        message: message ? atob(message) : message,
        compile_output: compile_output ? atob(compile_output) : compile_output,
        stderr: stderr ? atob(stderr) : stderr,
        stdout: stdout ? atob(stdout) : stdout,
      };
      break;
    }
  }

  // if all test cases passed, send success response
  if (correct == results.length) {
    const { time, memory, status } = results[0];
    const accepted_submissions = await Submission.find({
      id: 3,
      language_id,
      question: question_id,
    });

    const { time_status, memory_status } = calc_performance(
      accepted_submissions,
      time,
      memory
    );
    response = {
      total_cases: results.length,
      passed_cases: correct,
      description: status.description,
      id: status.id,
      success: true,
      time,
      memory,
      time_status: time_status.toFixed(2),
      memory_status: memory_status.toFixed(2),
    };
  }

  return response;
};
