const asyncHandler = (handler) => async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error('Error caught:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  };
  
  module.exports = asyncHandler;
  