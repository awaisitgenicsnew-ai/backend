const { sequelize } = require('../config/database');

const Admin = require('./Admin')(sequelize);
const Contact = require('./Contact')(sequelize);

const db = {
  sequelize,
  Admin,
  Contact
};

module.exports = db;
