const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    badge: {
      type: DataTypes.ENUM('High Demand', 'High Trending'),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('In Planning', 'In Development', 'Coming Soon'),
      allowNull: false,
      defaultValue: 'In Planning',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    handover: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    payment: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    primaryButtonText: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'primary_button_text',
    },
    primaryButtonLink: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'primary_button_link',
    },
    secondaryButtonText: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'secondary_button_text',
    },
    secondaryButtonLink: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'secondary_button_link',
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    imageAlt: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'image_alt',
    },
  }, {
    tableName: 'projects',
    timestamps: true,
    indexes: [
      {
        fields: ['status'],
      },
    ],
  });

  return Project;
};
