const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./index");

class Instruction extends Model {}

Instruction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    workout_id: DataTypes.INTEGER,
    exercise_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    instruction: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Instruction",
  }
);

module.exports = Instruction;
