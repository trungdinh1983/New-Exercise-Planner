// Importing required modules from Sequelize
const { Model, DataTypes } = require("sequelize");

// Importing the database configuration
const sequelize = require("../config/database");

// Defining the User class, extending Sequelize's Model class
class User extends Model {}

// Initializing the User model with its attributes and options
User.init(
  {
    // Auto-incrementing primary key
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // User's name as a string
    name: DataTypes.STRING,
    // User's email as a string
    email: DataTypes.STRING,
    // User's hashed password as a string
    password_digest: DataTypes.STRING,
    // Soft delete field, can be null
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // Database connection
    sequelize,
    // Model name
    modelName: "User",
    // Enable soft deletes (paranoid mode)
    paranoid: true,
  }
);

// Exporting the User model to be used in other parts of the app
module.exports = User;
