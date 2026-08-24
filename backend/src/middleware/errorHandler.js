const errorHandler = (err, req, res, _next) => {
  console.error('🔥 Server Error:', err.message || err);

  const statusCode = err.statusCode || 500;
  const message = err.isPublic ? err.message : 'An error occurred while processing your request. ❤️';

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
