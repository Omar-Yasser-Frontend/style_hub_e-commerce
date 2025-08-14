class AppError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.success = false;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
