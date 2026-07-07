'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    await queryInterface.bulkInsert('admins', [
      {
        username: 'admin',
        email: 'admin@pltproperties.com',
        password: hashedPassword,
        role: 'admin',
        created_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
