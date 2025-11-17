const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize instance using SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite', // Lightweight local DB for quick development
  storage: path.join(__dirname, '../../database/database.sqlite'), // Absolute DB file path
  logging: false // Disable SQL logs for cleaner console output
});

module.exports = { sequelize };
