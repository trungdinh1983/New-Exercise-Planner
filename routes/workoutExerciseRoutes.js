const express = require("express");
const router = express.Router();
const workoutExerciseController = require("../controllers/workoutExerciseController");

// Create a new workout-exercise relation
router.post("/", workoutExerciseController.createWorkoutExercise);

// Get all workout-exercise relations
router.get("/", workoutExerciseController.getAllWorkoutExercises);

// Get a single workout-exercise relation by ID
router.get("/:id", workoutExerciseController.getWorkoutExerciseById);

// Update a workout-exercise relation by ID
router.put("/:id", workoutExerciseController.updateWorkoutExercise);

// Delete a workout-exercise relation by ID
router.delete("/:id", workoutExerciseController.deleteWorkoutExercise);

module.exports = router;
