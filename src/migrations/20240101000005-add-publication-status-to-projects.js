module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projects', 'publication_status', {
      type: Sequelize.ENUM('draft', 'published'),
      allowNull: false,
      defaultValue: 'draft',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'publication_status');
  },
};
