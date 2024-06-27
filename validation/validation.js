// validation/validation.js

const { body, validationResult } = require('express-validator');

// Validation middleware for POST / PATCH requests
const valid = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required'),
    body('duration').notEmpty().withMessage('Duration is required')
  ];
};

// Validation middleware for PATCH requests (update)
const validateUpdateCourse = () => {
  return [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('price').optional().notEmpty().withMessage('Price is required'),
    body('duration').optional().notEmpty().withMessage('Duration is required')
  ];
};

// Custom middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAIL', errors: errors.array() });
  }
  next();
};

module.exports = {
  valid,
  validateUpdateCourse,
  handleValidationErrors,
};
