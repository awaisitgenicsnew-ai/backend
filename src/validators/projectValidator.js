const { body, validationResult } = require('express-validator');

/**
 * Validation rules for project creation/update
 */
const validateProject = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ min: 2, max: 255 })
    .withMessage('Title must be between 2 and 255 characters.'),

  body('location')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Location must not exceed 255 characters.'),

  body('badge')
    .optional({ checkFalsy: true })
    .isIn(['High Demand', 'High Trending'])
    .withMessage('Badge must be one of: High Demand, High Trending.'),

  body('status')
    .optional()
    .isIn(['In Planning', 'In Development', 'Coming Soon'])
    .withMessage('Status must be one of: In Planning, In Development, Coming Soon.'),

  body('publication_status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Publication status must be one of: draft, published.'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description must not exceed 5000 characters.'),

  body('type')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Type must not exceed 100 characters.'),

  body('handover')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Handover must not exceed 100 characters.'),

  body('payment')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Payment must not exceed 100 characters.'),

  body('primaryButtonText')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Primary button text must not exceed 100 characters.'),

  body('primaryButtonLink')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Primary button link must not exceed 500 characters.'),

  body('secondaryButtonText')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Secondary button text must not exceed 100 characters.'),

  body('secondaryButtonLink')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Secondary button link must not exceed 500 characters.'),

  body('image')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Image URL must not exceed 500 characters.'),

  body('imageAlt')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Image alt text must not exceed 255 characters.'),

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
  validateProject,
};
