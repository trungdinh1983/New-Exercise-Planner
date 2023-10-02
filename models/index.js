"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/database.js");
const config = dbConfig[env];
const db = {};

// Initialize Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import custom models
const initUser = require("./User.js");
const initWorkout = require("./Workout");
const initExercise = require("./Exercise");
const initTrend = require("./Trend");
const initInstruction = require("./Instruction");
const initWorkoutExercise = require("./WorkoutExercise");

const User = initUser(sequelize, Sequelize.DataTypes);
const Workout = initWorkout(sequelize, Sequelize.DataTypes);
const Exercise = initExercise(sequelize, Sequelize.DataTypes);
const Trend = initTrend(sequelize, Sequelize.DataTypes);
const Instruction = initInstruction(sequelize, Sequelize.DataTypes);
const WorkoutExercise = initWorkoutExercise(sequelize, Sequelize.DataTypes);

// Define relationships
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

// Add models to db object for external usage
db.User = User;
db.Workout = Workout;
db.Exercise = Exercise;
db.Trend = Trend;
db.Instruction = Instruction;
db.WorkoutExercise = WorkoutExercise;

// Add Sequelize instance and Sequelize constructor to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object
module.exports = db;
