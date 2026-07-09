const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const leadRoutes = require('./leadRoutes');
const categoryRoutes = require('./categoryRoutes');
const authorRoutes = require('./authorRoutes');
const blogRoutes = require('./blogRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);
router.use('/admin/leads', leadRoutes);
router.use('/categories', categoryRoutes);
router.use('/authors', authorRoutes);
router.use('/blogs', blogRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running.',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
