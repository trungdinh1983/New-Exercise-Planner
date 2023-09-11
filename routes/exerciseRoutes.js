const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

// Create a new exercise
router.post("/", exerciseController.createExercise);

// Get all exercises
router.get("/", exerciseController.getAllExercises);

// Get a single exercise by ID
router.get("/:id", exerciseController.getExerciseById);

// Update an exercise by ID
router.put("/:id", exerciseController.updateExercise);

// Delete an exercise by ID
router.delete("/:id", exerciseController.deleteExercise);

module.exports = router;
