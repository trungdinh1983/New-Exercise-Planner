const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class WorkoutExercise extends Model {}

WorkoutExercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    workout_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER,
    reps: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "WorkoutExercise",
  }
);

module.exports = WorkoutExercise;
