const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  try {
    console.log('Connecting to MySQL...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Creating database...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'plt_tower'}\`;`);
    console.log('Database created successfully');
    
    await connection.end();
    console.log('Setup complete. Now run: npm run migrate');
  } catch (error) {
    console.error('Setup error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
