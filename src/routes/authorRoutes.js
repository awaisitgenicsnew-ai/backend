const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { validateAuthor } = require('../validators/authorValidator');

// Get all authors
router.get('/', authorController.getAllAuthors);

// Get author by ID
router.get('/:id', authorController.getAuthorById);

// Create new author with image upload
router.post('/', (req, res, next) => {
  req.app.locals.upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
}, validateAuthor, authorController.createAuthor);

// Update author with image upload
router.put('/:id', (req, res, next) => {
  req.app.locals.upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
}, validateAuthor, authorController.updateAuthor);

// Delete author
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
