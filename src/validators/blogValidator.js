const { body, validationResult } = require('express-validator');

/**
 * Validation rules for blog creation/update
 */
const validateBlog = [
  body('metaTitle')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Meta title must not exceed 255 characters.'),

  body('metaDescription')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Meta description must not exceed 5000 characters.'),

  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required.')
    .isLength({ min: 2, max: 255 })
    .withMessage('Slug must be between 2 and 255 characters.')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens.'),

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ min: 2, max: 255 })
    .withMessage('Title must be between 2 and 255 characters.'),

  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Short description must not exceed 5000 characters.'),

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

  body('metaKeywords')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Meta keywords must not exceed 5000 characters.'),

  body('mainContent')
    .trim()
    .notEmpty()
    .withMessage('Main content is required.'),

  body('authorId')
    .optional()
    .isInt()
    .withMessage('Author ID must be a valid integer.'),

  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be one of: draft, published, archived.'),

  body('categoryIds')
    .optional()
    .isArray()
    .withMessage('Category IDs must be an array.')
    .custom((value) => {
      if (value && value.some(id => !Number.isInteger(id))) {
        throw new Error('All category IDs must be integers.');
      }
      return true;
    }),

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
  validateBlog,
};
