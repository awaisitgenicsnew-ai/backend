const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Register Admin
router.post('/register', adminController.register);

// Login Admin
router.post('/login', adminController.login);

// Get Admin Profile (Protected Route)
router.get('/profile', adminController.getProfile);

module.exports = router;
