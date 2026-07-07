require('dotenv').config();
const db = require('../models');

const syncDatabase = async () => {
  try {
    console.log('🔄 Starting database synchronization...');
    
    // Test connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Drop all tables first
    console.log('🗑️  Dropping all existing tables...');
    await db.sequelize.drop();
    console.log('✅ All tables dropped successfully.');
    
    // Sync all tables with force: true to recreate them
    console.log('📝 Creating tables from models...');
    await db.sequelize.sync({ force: true });
    console.log('✅ All tables created successfully.');
    
    console.log('🎉 Database synchronization completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
    process.exit(1);
  }
};

syncDatabase();
