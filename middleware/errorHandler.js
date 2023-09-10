// errorHandler.js

// Custom error handler middleware for your Exercise App
function errorHandler(err, req, res, next) {
  // Log the error for debugging purposes
  console.error(err);

  // Define a default error message and status code
  let message = "Oops, something went wrong!";
  let statusCode = 500;

  // Check the type of error and set a more specific message and status code if needed
  if (err instanceof ValidationError) {
    // Sequelize validation error
    message = "Validation failed. Please check your data.";
    statusCode = 400;
  } else if (err instanceof UnauthorizedError) {
    // Unauthorized access error
    message = "Unauthorized. You do not have permission to access this resource.";
    statusCode = 401;
  } else if (err instanceof NotFoundError) {
    // Resource not found error
    message = "Resource not found.";
    statusCode = 404;
  }

  // Send a JSON response with the error message and status code
  res.status(statusCode).json({ error: message });
}

module.exports = errorHandler;
