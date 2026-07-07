const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'plt_tower',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected');
  } catch (error) {
    if (error.parent?.code === 'ER_BAD_DB_ERROR') {
      // Database doesn't exist, create it
      console.log('Database does not exist. Creating...');
      const connection = await sequelize.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
      });
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'plt_tower'}\`;`);
      await connection.close();
      console.log('Database created. Connecting...');
      await sequelize.authenticate();
      console.log('MySQL Connected');
    } else {
      console.error('MySQL Connection Error:', error);
      process.exit(1);
    }
  }
};

module.exports = { sequelize, connectDB };
