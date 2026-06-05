// Global error handling middleware
// This catches all errors and sends a unified response(to replace try and catch block)
const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
