// Importing Sequelize library to help connect to the database
const { Sequelize } = require("sequelize");

// Database configuration for development environment
const development = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Environment variable for security
  database: "trungmacbook", // Your database name
  host: "127.0.0.1", // Localhost for dev
  dialect: "postgres", // Using PostgreSQL as your database
};

// Database configuration for test environment
const test = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Environment variable for security
  database: "trungmacbook", // Your database name for testing
  host: "127.0.0.1", // Localhost for testing
  dialect: "postgres", // Using PostgreSQL as your database
};

// Database configuration for production environment
const production = {
  username: "postgres",
  password: process.env.DB_PASSWORD, // Environment variable for security
  database: "trungmacbook", // Your database name for production
  host: "127.0.0.1", // Production database host (update if needed)
  dialect: "postgres", // Using PostgreSQL as your database
};

// Determine the environment and get the appropriate config
const env = process.env.NODE_ENV || "development";
const config = { development, test, production }[env];

// Initialize Sequelize to connect to the database
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  // Add more options like logging, etc., if you need
});

// Export the Sequelize instance to use it in other parts of your app
module.exports = sequelize;
