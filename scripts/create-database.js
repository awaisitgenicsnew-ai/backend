require('dotenv').config();
const mysql = require('mysql2/promise');

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    const dbName = process.env.DB_NAME || 'plt_tower_db2';
    
    console.log(`Creating database: ${dbName}...`);
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    
    console.log(`✅ Database '${dbName}' created successfully!`);
    
    console.log('\nNext steps:');
    console.log('1. Run: npm run migrate');
    console.log('2. Run: npm run seed');
    console.log('3. Run: npm run dev');
    
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

createDatabase();
