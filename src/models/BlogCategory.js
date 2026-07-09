const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BlogCategory = sequelize.define('BlogCategory', {
    blogId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'blog_id',
      references: {
        model: 'blogs',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  }, {
    tableName: 'blog_categories',
    timestamps: false,
  });

  return BlogCategory;
};
