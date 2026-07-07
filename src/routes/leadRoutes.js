const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { validateLeadSubmission, validateLeadUpdate } = require('../validators/leadValidator');
const { authenticate } = require('../middleware/auth');
const { leadSubmissionLimiter, apiLimiter } = require('../middleware/rateLimiter');

/**
 * @route   POST /api/leads
 * @desc    Create a new lead (public)
 * @access  Public
 */
router.post('/', validateLeadSubmission, leadController.createLead);

/**
 * @route   GET /api/admin/leads/stats
 * @desc    Get lead statistics
 * @access  Private (Admin)
 */
router.get('/stats', authenticate, apiLimiter, leadController.getLeadStats);

/**
 * @route   GET /api/admin/leads
 * @desc    Get all leads with pagination, search, and filter
 * @access  Private (Admin)
 */
router.get('/', authenticate, apiLimiter, leadController.getAllLeads);

/**
 * @route   GET /api/admin/leads/:id
 * @desc    Get lead by ID
 * @access  Private (Admin)
 */
router.get('/:id', authenticate, apiLimiter, leadController.getLeadById);

/**
 * @route   PUT /api/admin/leads/:id
 * @desc    Update lead
 * @access  Private (Admin)
 */
router.put('/:id', authenticate, apiLimiter, validateLeadUpdate, leadController.updateLead);

/**
 * @route   DELETE /api/admin/leads/:id
 * @desc    Delete lead
 * @access  Private (Admin)
 */
router.delete('/:id', authenticate, apiLimiter, leadController.deleteLead);

module.exports = router;
