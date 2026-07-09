const { body, validationResult } = require('express-validator');

/**
 * Validation rules for category creation/update
 */
const validateCategory = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters.'),

  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Slug must be between 2 and 100 characters.')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

module.exports = {
  validateCategory,
};
