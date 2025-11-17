const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

// User model: stores registered users and authentication details
const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },

  // Display name for the user
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  // Unique email used for login
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },

  // Hashed password stored securely (never plain text)
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
});

module.exports = User;
