const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Insert super admin
    await queryInterface.bulkInsert('admins', [
      {
        name: 'Super Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'super_admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admins', {
      email: 'admin@example.com',
    }, {});
  },
};
