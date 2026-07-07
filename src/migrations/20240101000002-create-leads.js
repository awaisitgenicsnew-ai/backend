module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('leads', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      development_of_interest: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      interest: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('new', 'contacted', 'qualified', 'closed'),
        allowNull: false,
        defaultValue: 'new',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      assigned_to: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'admins',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.addIndex('leads', ['status']);
    await queryInterface.addIndex('leads', ['email']);
    await queryInterface.addIndex('leads', ['phone']);
    await queryInterface.addIndex('leads', ['createdAt']);
    await queryInterface.addIndex('leads', ['assigned_to']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('leads');
  },
};
