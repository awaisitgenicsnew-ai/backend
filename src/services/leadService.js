const db = require('../models');
const { formatPagination, buildLeadSearchConditions, buildLeadFilterConditions, buildLeadOrder } = require('../utils/helpers');

/**
 * Create a new lead (public endpoint)
 */
const createLead = async (leadData) => {
  const lead = await db.Lead.create({
    name: leadData.name,
    email: leadData.email,
    phone: leadData.phone || null,
    developmentOfInterest: leadData.developmentOfInterest || null,
    interest: leadData.interest || null,
    subject: leadData.subject,
    message: leadData.message,
    status: 'new',
  });

  return lead;
};

/**
 * Get all leads with pagination, search, and filter (admin)
 */
const getAllLeads = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    status = '',
    sortBy = 'createdAt',
    sortOrder = 'DESC',
  } = queryParams;

  const { offset, limit: limitValue } = formatPagination(page, limit);
  const where = {
    ...buildLeadSearchConditions(search),
    ...buildLeadFilterConditions(status),
  };
  const order = buildLeadOrder(sortBy, sortOrder);

  const { count, rows } = await db.Lead.findAndCountAll({
    where,
    order,
    offset,
    limit: limitValue,
    include: [
      {
        model: db.Admin,
        as: 'assignedAdmin',
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  return {
    leads: rows,
    pagination: {
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(count / limit),
    },
  };
};

/**
 * Get lead by ID (admin)
 */
const getLeadById = async (id) => {
  const lead = await db.Lead.findByPk(id, {
    include: [
      {
        model: db.Admin,
        as: 'assignedAdmin',
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  if (!lead) {
    throw new Error('Lead not found.');
  }

  return lead;
};

/**
 * Update lead (admin)
 */
const updateLead = async (id, updateData) => {
  const lead = await db.Lead.findByPk(id);

  if (!lead) {
    throw new Error('Lead not found.');
  }

  // Update only allowed fields
  const allowedFields = ['status', 'notes', 'assignedTo'];
  const updates = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      updates[field] = updateData[field];
    }
  });

  await lead.update(updates);

  // Return updated lead with associations
  const updatedLead = await db.Lead.findByPk(id, {
    include: [
      {
        model: db.Admin,
        as: 'assignedAdmin',
        attributes: ['id', 'name', 'email'],
      },
    ],
  });

  return updatedLead;
};

/**
 * Delete lead (admin)
 */
const deleteLead = async (id) => {
  const lead = await db.Lead.findByPk(id);

  if (!lead) {
    throw new Error('Lead not found.');
  }

  await lead.destroy();

  return { message: 'Lead deleted successfully.' };
};

/**
 * Get lead statistics (admin)
 */
const getLeadStats = async () => {
  const total = await db.Lead.count();
  const newLeads = await db.Lead.count({ where: { status: 'new' } });
  const contacted = await db.Lead.count({ where: { status: 'contacted' } });
  const qualified = await db.Lead.count({ where: { status: 'qualified' } });
  const closed = await db.Lead.count({ where: { status: 'closed' } });

  return {
    total,
    new: newLeads,
    contacted,
    qualified,
    closed,
  };
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadStats,
};
