import axios from "axios";

/*
  We are using the `judge0` API for code execution. Its working is as follows :

  To run a code, there are 2 endpoints:
    1) /submissions         - to make a single submission
    2) /submissions/batch   - to make multiple submissions in a single request
  We use `/submissions/batch` in our app to make a submission for each test case

  The request returns token/array of tokens which can be used to get the result for a submission.
  We make another call to the API along with the tokens to get back the result
*/

/** Template object of options judge0 api expects when creating a submission.
 * Commented out fields are set dynamically.
 */
const execute_params = {
  method: "POST",
  //   url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
  //   url: "https://judge0-ce.p.rapidapi.com/submissions/",
  //   params: {
  //     base64_encoded: "true",
  //   },
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
    // "X-RapidAPI-Key": "b10063b6f7mshd920a35de930cd9p130a5djsncf74b05d49c2",
    "X-RapidAPI-Key": "59feebeae6msh5e475fbaffe97dbp1386c8jsnabe7693918e8",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  },
  //   data: {
  //     submissions: [
  //       {
  //         language_id: 71,
  //         source_code: "cHJpbnQoImhlbGxvIGZyb20gUHl0aG9uIikK",
  //       },
  //       {
  //         language_id: 71,
  //         source_code: "cHJpbnQoImhlbGxvIGZyb20gUHl0aG9uIikK",
  //       },
  //     ],
  //   },
};

/** Template object of options judge0 api expects when getting back result for submissions
 * Commented out fields are set dynamically.
 */
const get_result_params = {
  method: "GET",
  // url: "https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=",
  // url: "https://judge0-ce.p.rapidapi.com/submissions/",
  //   params: {
  //     base64_encoded: "true",
  //     fields: "*",
  //   },
  headers: {
    "X-RapidAPI-Key": "b10063b6f7mshd920a35de930cd9p130a5djsncf74b05d49c2",
    // "X-RapidAPI-Key": "59feebeae6msh5e475fbaffe97dbp1386c8jsnabe7693918e8",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

/**Creates object of options judge0 api expects when creating a submission by adding dynamic data.*/
const create_submission_req = (code_options, testCases) => {
  const options = { ...execute_params };
  options.url = "https://judge0-ce.p.rapidapi.com/submissions/batch";
  const submissions = Object.keys(testCases).map((el) => {
    return { ...code_options, stdin: el, expected_output: testCases[el] };
  });
  options.data = {};
  options.data.submissions = submissions;
  return options;
};

/**Creates object of options judge0 api expects when getting back result of submissions by adding dynamic data.*/
const get_result_req = (response) => {
  const options = { ...get_result_params };
  options.url = "https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=";
  for (const el in response.data) {
    options.url += `${response.data[el].token},`;
  }
  options.url = options.url.slice(0, -1);
  options.url += "&base64_encoded=true";
  return options;
};

/** Make batch request to the judge0 api.
 * We send mutiple submissions in a single request.
 * The API returns a `token` for each submission which we can use to get back result for it.
 */
export const make_batch_request = async (code_options, testCases) => {
  try {
    //prettier-ignore
    const create_submission_options = create_submission_req(code_options,testCases);

    // Make an API call to create a submission
    const response = await axios.request(create_submission_options);

    const get_result_options = get_result_req(response);

    // Make an API call to get back result for the submissions
    let result = await axios.request(get_result_options);

    //prettier-ignore
    while (result.data.submissions.some((res) => res.status.id === 1 || res.status.id === 2)) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      result = await axios.request(get_result_options);
    }

    // return the submission result
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

/**Make a single submission to the API */
export const make_request = async (code_options, testCase, answer) => {
  try {
    code_options.expected_output = answer;
    code_options.stdin = testCase;
    const params = { ...execute_params };
    params.url = "https://judge0-ce.p.rapidapi.com/submissions/";
    params.data = code_options;
    const response = await axios.request(params);
    console.log(response.data);

    const params2 = { ...get_result_params };
    params2.url = `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}?base64_encoded=true`;

    let response2 = await axios.request(params2);
    while (response2.data.status.id == 1 || response2.data.status.id == 2) {
      response2 = await axios.request(params2);
    }
    // console.log(response2.data);
  } catch (error) {
    console.error(error);
  }
};
