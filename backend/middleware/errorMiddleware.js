const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource id' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation failed',
      details: Object.values(err.errors).map((item) => item.message)
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
    details: err.details || []
  });
};

export default errorHandler;
