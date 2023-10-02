const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

class Trend extends Model {}

Trend.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    workout_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    period: DataTypes.STRING,
    calories_burned: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "Trend",
  }
);

module.exports = Trend;
