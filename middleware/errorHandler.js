const HttpStatus = require('../utils/httpStatus.js');

const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next); // تنفيذ الدالة الممررة
  } catch (error) {
    console.error('Error caught:', error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' }); // رد الخطأ الداخلي
  }
};

module.exports = asyncHandler;
