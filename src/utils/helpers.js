/**
 * Format pagination parameters
 */
const formatPagination = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return { offset, limit: parseInt(limit) };
};

/**
 * Build search conditions for leads
 */
const buildLeadSearchConditions = (search) => {
  if (!search) return {};

  const { Op } = require('sequelize');
  
  return {
    [Op.or]: [
      { name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
      { phone: { [Op.like]: `%${search}%` } },
    ],
  };
};

/**
 * Build filter conditions for leads
 */
const buildLeadFilterConditions = (status) => {
  if (!status) return {};

  return { status };
};

/**
 * Build order clause for leads
 */
const buildLeadOrder = (sortBy = 'createdAt', sortOrder = 'DESC') => {
  const validSortFields = ['createdAt', 'updatedAt', 'name', 'email', 'status'];
  const validSortOrders = ['ASC', 'DESC'];

  const field = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const order = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';

  return [[field, order]];
};

module.exports = {
  formatPagination,
  buildLeadSearchConditions,
  buildLeadFilterConditions,
  buildLeadOrder,
};
