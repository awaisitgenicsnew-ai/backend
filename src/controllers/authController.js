const authService = require('../services/authService');

/**
 * Admin login controller
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current admin profile controller
 */
const getProfile = async (req, res, next) => {
  try {
    const admin = await authService.getProfile(req.admin.id);

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully.',
      data: { admin },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getProfile,
};
