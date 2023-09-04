// Load environment variables
require("dotenv").config();

// Import necessary modules
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { Sequelize } = require("sequelize"); // Import Sequelize

// Import custom config
const config = require("./config");
const dbConfigs = require("./config/database"); // Import your new database config

// Setup the app and env
const app = express();
const env = process.env.NODE_ENV || "development";
const dbConfig = dbConfigs[env]; // Choose the correct DB settings

// Initialize the database
const sequelize = new Sequelize(dbConfig); // Use your new database config here

// Use middlewares
app.use(express.json());
app.use(session(config.session)); // Assuming you have session config in './config/index.js'
app.use(passport.initialize());
app.use(passport.session());

// Import and use custom middlewares and routes
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes"); // Import all routes from a routes/index.js file

app.use(authMiddleware);
app.use(routes); // Using the imported routes
app.use(errorHandler); // Catching and handling errors

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
