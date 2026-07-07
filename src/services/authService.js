const bcrypt = require('bcrypt');
const db = require('../models');
const { generateToken } = require('../utils/jwt');

/**
 * Admin login service
 */
const login = async (email, password) => {
  // Find admin by email
  const admin = await db.Admin.findOne({
    where: { email },
  });

  if (!admin) {
    throw new Error('Invalid credentials.');
  }

  // Check if admin is active
  if (!admin.isActive) {
    throw new Error('Account is deactivated.');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials.');
  }

  // Generate JWT token
  const token = generateToken({
    id: admin.id,
    email: admin.email,
    role: admin.role,
  });

  // Return admin data without password
  const adminData = admin.toJSON();
  delete adminData.password;

  return {
    admin: adminData,
    token,
  };
};

/**
 * Get current admin profile
 */
const getProfile = async (adminId) => {
  const admin = await db.Admin.findByPk(adminId, {
    attributes: { exclude: ['password'] },
  });

  if (!admin) {
    throw new Error('Admin not found.');
  }

  return admin;
};

module.exports = {
  login,
  getProfile,
};
