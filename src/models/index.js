const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.Admin = require('./Admin')(sequelize, Sequelize);
db.Lead = require('./Lead')(sequelize, Sequelize);
db.Category = require('./Category')(sequelize, Sequelize);
db.Author = require('./Author')(sequelize, Sequelize);
db.Blog = require('./Blog')(sequelize, Sequelize);
db.BlogCategory = require('./BlogCategory')(sequelize, Sequelize);

// Define associations
db.Admin.hasMany(db.Lead, { foreignKey: 'assignedTo', as: 'assignedLeads' });
db.Lead.belongsTo(db.Admin, { foreignKey: 'assignedTo', as: 'assignedAdmin' });

// Blog associations
db.Author.hasMany(db.Blog, { foreignKey: 'authorId', as: 'blogs' });
db.Blog.belongsTo(db.Author, { foreignKey: 'authorId', as: 'author' });

// Blog-Category many-to-many association
db.Blog.belongsToMany(db.Category, {
  through: db.BlogCategory,
  foreignKey: 'blogId',
  otherKey: 'categoryId',
  as: 'categories',
});
db.Category.belongsToMany(db.Blog, {
  through: db.BlogCategory,
  foreignKey: 'categoryId',
  otherKey: 'blogId',
  as: 'blogs',
});

module.exports = db;
