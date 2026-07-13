module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      badge: {
        type: Sequelize.ENUM('High Demand', 'High Trending'),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('In Planning', 'In Development', 'Coming Soon'),
        allowNull: false,
        defaultValue: 'In Planning',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      handover: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      payment: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      primary_button_text: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      primary_button_link: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      secondary_button_text: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      secondary_button_link: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      image_alt: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    // Add indexes
    await queryInterface.addIndex('projects', ['status']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects');
  },
};
