const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { validateProject } = require('../validators/projectValidator');

// Get all projects (with optional filters: status, badge)
router.get('/', projectController.getAllProjects);

// Get project by ID
router.get('/:id', projectController.getProjectById);

// Create new project with image upload
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
}, validateProject, projectController.createProject);

// Update project with image upload
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
}, validateProject, projectController.updateProject);

// Delete project
router.delete('/:id', projectController.deleteProject);

module.exports = router;
