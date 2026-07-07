const leadService = require('../services/leadService');

/**
 * Create a new lead (public endpoint)
 */
const createLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.body);

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully.',
      data: { lead },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all leads (admin)
 */
const getAllLeads = async (req, res, next) => {
  try {
    const result = await leadService.getAllLeads(req.query);

    res.status(200).json({
      success: true,
      message: 'Leads retrieved successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get lead by ID (admin)
 */
const getLeadById = async (req, res, next) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Lead retrieved successfully.',
      data: { lead },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update lead (admin)
 */
const updateLead = async (req, res, next) => {
  try {
    const lead = await leadService.updateLead(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Lead updated successfully.',
      data: { lead },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete lead (admin)
 */
const deleteLead = async (req, res, next) => {
  try {
    const result = await leadService.deleteLead(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get lead statistics (admin)
 */
const getLeadStats = async (req, res, next) => {
  try {
    const stats = await leadService.getLeadStats();

    res.status(200).json({
      success: true,
      message: 'Lead statistics retrieved successfully.',
      data: { stats },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
};
