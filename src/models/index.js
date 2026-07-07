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

// Define associations
db.Admin.hasMany(db.Lead, { foreignKey: 'assignedTo', as: 'assignedLeads' });
db.Lead.belongsTo(db.Admin, { foreignKey: 'assignedTo', as: 'assignedAdmin' });

module.exports = db;
