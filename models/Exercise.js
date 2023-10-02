const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

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
