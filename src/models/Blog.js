const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    metaTitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'meta_title',
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'meta_description',
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'short_description',
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
    metaKeywords: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'meta_keywords',
    },
    mainContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'main_content',
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'author_id',
      references: {
        model: 'authors',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false,
      defaultValue: 'draft',
    },
  }, {
    tableName: 'blogs',
    timestamps: true,
    indexes: [
      {
        fields: ['slug'],
        unique: true,
      },
      {
        fields: ['status'],
      },
      {
        fields: ['author_id'],
      },
    ],
  });

  return Blog;
};
