const statuses = [
  { id: 1, description: "In Queue" },
  { id: 2, description: "Processing" },
  { id: 3, description: "Accepted" },
  { id: 4, description: "Wrong Answer" },
  { id: 5, description: "Time Limit Exceeded" },
  { id: 6, description: "Compilation Error" },
  { id: 7, description: "Runtime Error (SIGSEGV)" },
  { id: 8, description: "Runtime Error (SIGXFSZ)" },
  { id: 9, description: "Runtime Error (SIGFPE)" },
  { id: 10, description: "Runtime Error (SIGABRT)" },
  { id: 11, description: "Runtime Error (NZEC)" },
  { id: 12, description: "Runtime Error (Other)" },
  { id: 13, description: "Internal Error" },
  { id: 14, description: "Exec Format Error" },
];

/*In Queue:

Description: The code submission is in the processing queue, waiting for its turn to be executed.
Meaning: The code has been submitted but hasn't been executed yet.
Processing:

Description: The code submission is currently being processed and evaluated.
Meaning: The code is actively being executed and evaluated by the system.
Accepted:

Description: The code submission has been accepted, meaning it produced the expected output.
Meaning: The code has run successfully and produced the correct output as expected.
Wrong Answer:

Description: The code submission produced incorrect output.
Meaning: The code executed, but the output does not match the expected output.
Time Limit Exceeded:

Description: The code took too long to execute and exceeded the allowed time limit.
Meaning: The code couldn't complete within the specified time constraints.
Compilation Error:

Description: There was an issue during code compilation.
Meaning: The code failed to compile, indicating a syntax or compilation error.
Runtime Error (SIGSEGV):

Description: The code encountered a segmentation fault (memory access violation).
Meaning: The code attempted to access a memory location that it wasn't allowed to access.
Runtime Error (SIGXFSZ):

Description: The code exceeded the file size limit.
Meaning: The code attempted to create a file that exceeded the allowed file size.
Runtime Error (SIGFPE):

Description: The code encountered a floating-point exception (e.g., division by zero).
Meaning: The code performed an illegal floating-point operation.
Runtime Error (SIGABRT):

Description: The code encountered an abort signal.
Meaning: The code intentionally terminated execution due to an issue.
Runtime Error (NZEC):

Description: The code encountered a non-zero exit code.
Meaning: The code didn't complete successfully and returned a non-zero exit code.
Runtime Error (Other):

Description: The code encountered a runtime error that doesn't fit into the specific categories above.
Meaning: The code encountered a runtime error, but the exact nature of the error is unspecified.
Internal Error:

Description: An internal error occurred in the system.
Meaning: There was an issue on the system's end that prevented code evaluation.
Exec Format Error:

Description: The code has an issue with its executable format.
Meaning: The code format or structure is not compatible with the system.*/
