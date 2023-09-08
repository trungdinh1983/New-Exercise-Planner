const { Workout } = require("../models");
const { Op } = require("sequelize");

const workoutController = {
  // Create a new workout
  createWorkout: async (req, res) => {
    try {
      const newWorkout = await Workout.create(req.body);
      res.status(201).json(newWorkout);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all workouts
  getAllWorkouts: async (req, res) => {
    try {
      const workouts = await Workout.findAll({
        where: {
          deletedAt: null, // Soft delete check
        },
      });
      res.status(200).json(workouts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get a single workout by ID
  getWorkoutById: async (req, res) => {
    try {
      const workout = await Workout.findOne({
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
      }

      res.status(200).json(workout);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update a workout
  updateWorkout: async (req, res) => {
    try {
      const updated = await Workout.update(req.body, {
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (updated[0] === 0) {
        return res.status(404).json({ error: "Workout not found" });
      }

      res.status(200).json({ message: "Workout updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Soft delete a workout
  deleteWorkout: async (req, res) => {
    try {
      const deleted = await Workout.update(
        { deletedAt: new Date() },
        {
          where: {
            id: req.params.id,
            deletedAt: null, // Soft delete check
          },
        }
      );

      if (deleted[0] === 0) {
        return res.status(404).json({ error: "Workout not found" });
      }

      res.status(200).json({ message: "Workout deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = workoutController;
