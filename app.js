// Required modules
require("dotenv").config(); // load environment variables from .env
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { Sequelize } = require("sequelize");
const config = require("./config.json");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

// Setup
const app = express();
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Middleware
app.use(bodyParser.json());
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Custom Middleware
app.use(authMiddleware); // Handles Authentication and Admin functionalities
app.use(adminMiddleware); // Handles Admin functionalities

// Sequelize setup
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

// Import Routes
const userRoutes = require("./routes/userRoutes"); // Will handle Profile, Authentication
const workoutRoutes = require("./routes/workoutRoutes"); // Will handle Stats, Favorites
const exerciseRoutes = require("./routes/exerciseRoutes"); // Will handle Search, Favorites
const trendRoutes = require("./routes/trendRoutes"); // Will handle Stats
const workoutExerciseRoutes = require("./routes/workoutExerciseRoutes"); // Will handle Lifestyle tips
const instructionRoutes = require("./routes/instructionRoutes"); // Will handle Notifications

// Use Routes
app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/trends", trendRoutes);
app.use("/workout-exercises", workoutExerciseRoutes);
app.use("/instructions", instructionRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});

// Starting the server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
