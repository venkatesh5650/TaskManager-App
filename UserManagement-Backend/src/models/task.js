const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const User = require('./user');

// Task model: stores user-specific tasks with status control
const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  // Short title describing the task
  title: { type: DataTypes.STRING, allowNull: false },

  // Optional detailed description
  description: { type: DataTypes.TEXT },

  // Track task progress using controlled values
  status: { 
    type: DataTypes.ENUM('todo', 'inprogress', 'done'), 
    defaultValue: 'todo' 
  }
});

// Define 1:N relationship → a User can have many Tasks
Task.belongsTo(User, { foreignKey: 'userId' });  // Each task belongs to a specific user
User.hasMany(Task, { foreignKey: 'userId' });    // User owns multiple tasks

module.exports = Task;
