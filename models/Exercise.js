const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Exercise extends Model {}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Exercise",
  }
);

module.exports = Exercise;
