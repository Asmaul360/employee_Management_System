export class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    stack = "",
    _errors = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.dada = null;
    this.message = message;
    this.stack = stack;
    this.errors = this.errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
