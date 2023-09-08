const { Exercise } = require("../models");
const { Op } = require("sequelize");

const exerciseController = {
  // Create a new exercise
  createExercise: async (req, res) => {
    try {
      const newExercise = await Exercise.create(req.body);
      res.status(201).json(newExercise);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all exercises
  getAllExercises: async (req, res) => {
    try {
      const exercises = await Exercise.findAll({
        where: {
          deletedAt: null, // Soft delete check
        },
      });
      res.status(200).json(exercises);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get a single exercise by ID
  getExerciseById: async (req, res) => {
    try {
      const exercise = await Exercise.findOne({
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      res.status(200).json(exercise);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update an exercise
  updateExercise: async (req, res) => {
    try {
      const updated = await Exercise.update(req.body, {
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (updated[0] === 0) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      res.status(200).json({ message: "Exercise updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Soft delete an exercise
  deleteExercise: async (req, res) => {
    try {
      const deleted = await Exercise.update(
        { deletedAt: new Date() },
        {
          where: {
            id: req.params.id,
            deletedAt: null, // Soft delete check
          },
        }
      );

      if (deleted[0] === 0) {
        return res.status(404).json({ error: "Exercise not found" });
      }

      res.status(200).json({ message: "Exercise deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = exerciseController;
