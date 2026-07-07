const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Lead = sequelize.define('Lead', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    developmentOfInterest: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'development_of_interest',
    },
    interest: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'qualified', 'closed'),
      allowNull: false,
      defaultValue: 'new',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'assigned_to',
      references: {
        model: 'admins',
        key: 'id',
      },
    },
  }, {
    tableName: 'leads',
    timestamps: true,
    indexes: [
      {
        fields: ['status'],
      },
      {
        fields: ['email'],
      },
      {
        fields: ['phone'],
      },
    ],
  });

  return Lead;
};
