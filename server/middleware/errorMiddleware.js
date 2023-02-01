const errorHandler = (err, req, res, next) => {
  // Get the status code: if it's set (like res.status(400) in controller function
  // the error is thrown), get that status code. But if it's not, get 500, which
  // is a server error.
  const statusCode = res.statusCode ? res.statusCode : 500;
  // JS ternary: condition ? if true, do this : if false, do this

  // Pass in the status code--either what was set or 500
  res.status(statusCode);

  // Respond with JSON
  res.json({
    message: err.message,
    // Stack trace which provides additional info but only wanted if
    // in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
