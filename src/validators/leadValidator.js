const { body, validationResult } = require('express-validator');

/**
 * Validation rules for lead submission
 */
const validateLeadSubmission = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim()
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone number must be between 10 and 20 characters.'),

  body('developmentOfInterest')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Development of interest must not exceed 255 characters.'),

  body('interest')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Interest must not exceed 255 characters.'),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required.')
    .isLength({ min: 3, max: 255 })
    .withMessage('Subject must be between 3 and 255 characters.'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters.'),

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

/**
 * Validation rules for lead update (admin)
 */
const validateLeadUpdate = [
  body('status')
    .optional()
    .isIn(['new', 'contacted', 'qualified', 'closed'])
    .withMessage('Status must be one of: new, contacted, qualified, closed.'),

  body('notes')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Notes must not exceed 5000 characters.'),

  body('assignedTo')
    .optional()
    .isInt()
    .withMessage('Assigned to must be a valid admin ID.'),

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
  validateLeadSubmission,
  validateLeadUpdate,
};
