const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Author = sequelize.define('Author', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  }, {
    tableName: 'authors',
    timestamps: true,
  });

  return Author;
};
