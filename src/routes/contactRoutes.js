const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Submit Contact Form
router.post('/', contactController.createContact);

// Get All Contacts (Admin only)
router.get('/', contactController.getAllContacts);

// Get Single Contact
router.get('/:id', contactController.getContactById);

// Update Contact Status
router.patch('/:id', contactController.updateContactStatus);

// Delete Contact
router.delete('/:id', contactController.deleteContact);

module.exports = router;
