"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/database.js"); // Importing database.js
const config = dbConfig[env]; // Using database.js settings
const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import custom models
const User = require("./User")(sequelize, Sequelize.DataTypes);
const Workout = require("./Workout")(sequelize, Sequelize.DataTypes);
const Exercise = require("./Exercise")(sequelize, Sequelize.DataTypes);
const Trend = require("./Trend")(sequelize, Sequelize.DataTypes);
const Instruction = require("./Instruction")(sequelize, Sequelize.DataTypes);
const WorkoutExercise = require("./WorkoutExercise")(sequelize, Sequelize.DataTypes);

// Make relationships
User.hasMany(Workout);
Workout.belongsTo(User);

Workout.hasMany(WorkoutExercise);
WorkoutExercise.belongsTo(Workout);

Exercise.hasMany(WorkoutExercise);
WorkoutExercise.belongsTo(Exercise);

Workout.hasMany(Trend);
Trend.belongsTo(Workout);

Workout.hasMany(Instruction);
Instruction.belongsTo(Workout);

Exercise.hasMany(Instruction);
Instruction.belongsTo(Exercise);

// Add custom models to db object
db.User = User;
db.Workout = Workout;
db.Exercise = Exercise;
db.Trend = Trend;
db.Instruction = Instruction;
db.WorkoutExercise = WorkoutExercise;

// Final Sequelize and db setup
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object which now includes both Sequelize and custom models
module.exports = db;
