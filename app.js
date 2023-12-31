// Load environment variables
require("dotenv").config();

// Import necessary modules
const express = require("express");
const passport = require("passport");
const session = require("express-session");

// Import custom config and models
const config = require("./config");
const db = require("./models");

// Import all routes from the routes folder
const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const trendRoutes = require("./routes/trendRoutes");
const instructionRoutes = require("./routes/instructionRoutes");
const workoutExerciseRoutes = require("./routes/workoutExerciseRoutes");

// Setup the app and environment
const app = express();
const PORT = process.env.PORT || 3000;

// Use middlewares
app.use(express.json());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

// Import and use custom middlewares
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

// Add the middlewares to the app
app.use(authMiddleware);

// Use routes
app.use("/user", userRoutes);
app.use("/workout", workoutRoutes);
app.use("/exercise", exerciseRoutes);
app.use("/trend", trendRoutes);
app.use("/instruction", instructionRoutes);
app.use("/workoutExercise", workoutExerciseRoutes);

// Error handling
app.use(errorHandler);

// Sync DB and start the app
db.sequelize // This uses the sequelize instance from models/index.js
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and rockin' on port ${PORT}! 🚀`);
    });
  })
  .catch((err) => {
    console.error("Bummer! Unable to connect to the database:", err);
  });
