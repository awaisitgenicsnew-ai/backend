const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { validateBlog } = require('../validators/blogValidator');

// Get all blogs (with optional filters: status, authorId, categoryId)
router.get('/', blogController.getAllBlogs);

// Get blog by ID
router.get('/id/:id', blogController.getBlogById);

// Get blog by slug
router.get('/slug/:slug', blogController.getBlogBySlug);

// Create new blog with image upload
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
}, validateBlog, blogController.createBlog);

// Update blog with image upload
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
}, validateBlog, blogController.updateBlog);

// Delete blog
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
