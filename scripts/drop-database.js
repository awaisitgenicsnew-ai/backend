require('dotenv').config();
const mysql = require('mysql2/promise');

async function dropDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    const dbName = process.env.DB_NAME || 'plt_tower_db2';
    
    console.log(`Dropping database: ${dbName}...`);
    
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
    
    console.log(`✅ Database '${dbName}' dropped successfully!`);
    
  } catch (error) {
    console.error('❌ Error dropping database:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

dropDatabase();
