const express = require("express");
const router = express.Router();
const trendController = require("../controllers/trendController");

// Create a new trend
router.post("/", trendController.createTrend);

// Get all trends
router.get("/", trendController.getAllTrends);

// Get a single trend by ID
router.get("/:id", trendController.getTrendById);

// Update a trend by ID
router.put("/:id", trendController.updateTrend);

// Delete a trend by ID
router.delete("/:id", trendController.deleteTrend);

module.exports = router;
