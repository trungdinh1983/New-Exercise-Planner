const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Workout extends Model {}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    warmup_time: DataTypes.INTEGER,
    workout_time: DataTypes.INTEGER,
    custom: DataTypes.BOOLEAN,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Workout",
    paranoid: true,
  }
);

module.exports = Workout;
