const { WorkoutExercise } = require("../models");

const workoutExerciseController = {
  // Create a new workout-exercise relation
  createWorkoutExercise: async (req, res) => {
    try {
      const newWorkoutExercise = await WorkoutExercise.create(req.body);
      res.status(201).json(newWorkoutExercise);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all workout-exercise relations
  getAllWorkoutExercises: async (req, res) => {
    try {
      const workoutExercises = await WorkoutExercise.findAll({
        where: {
          deletedAt: null, // Soft delete check
        },
      });
      res.status(200).json(workoutExercises);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get a single workout-exercise relation by ID
  getWorkoutExerciseById: async (req, res) => {
    try {
      const workoutExercise = await WorkoutExercise.findOne({
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (!workoutExercise) {
        return res.status(404).json({ error: "Workout-Exercise relation not found" });
      }

      res.status(200).json(workoutExercise);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update a workout-exercise relation
  updateWorkoutExercise: async (req, res) => {
    try {
      const updated = await WorkoutExercise.update(req.body, {
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (updated[0] === 0) {
        return res.status(404).json({ error: "Workout-Exercise relation not found" });
      }

      res.status(200).json({ message: "Workout-Exercise updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Soft delete a workout-exercise relation
  deleteWorkoutExercise: async (req, res) => {
    try {
      const deleted = await WorkoutExercise.update(
        { deletedAt: new Date() },
        {
          where: {
            id: req.params.id,
            deletedAt: null, // Soft delete check
          },
        }
      );

      if (deleted[0] === 0) {
        return res.status(404).json({ error: "Workout-Exercise relation not found" });
      }

      res.status(200).json({ message: "Workout-Exercise deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = workoutExerciseController;
