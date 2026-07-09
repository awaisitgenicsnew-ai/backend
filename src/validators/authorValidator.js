const { body, validationResult } = require('express-validator');

/**
 * Validation rules for author creation/update
 */
const validateAuthor = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters.'),

  body('bio')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Bio must not exceed 5000 characters.'),

  body('image')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Image URL must not exceed 500 characters.'),

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
  validateAuthor,
};
