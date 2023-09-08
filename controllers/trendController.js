const { Trend } = require("../models");
const { Op } = require("sequelize");

const trendController = {
  // Create a new trend
  createTrend: async (req, res) => {
    try {
      const newTrend = await Trend.create(req.body);
      res.status(201).json(newTrend);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all trends
  getAllTrends: async (req, res) => {
    try {
      const trends = await Trend.findAll({
        where: {
          deletedAt: null, // Soft delete check
        },
      });
      res.status(200).json(trends);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get a single trend by ID
  getTrendById: async (req, res) => {
    try {
      const trend = await Trend.findOne({
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (!trend) {
        return res.status(404).json({ error: "Trend not found" });
      }

      res.status(200).json(trend);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update a trend
  updateTrend: async (req, res) => {
    try {
      const updated = await Trend.update(req.body, {
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (updated[0] === 0) {
        return res.status(404).json({ error: "Trend not found" });
      }

      res.status(200).json({ message: "Trend updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Soft delete a trend
  deleteTrend: async (req, res) => {
    try {
      const deleted = await Trend.update(
        { deletedAt: new Date() },
        {
          where: {
            id: req.params.id,
            deletedAt: null, // Soft delete check
          },
        }
      );

      if (deleted[0] === 0) {
        return res.status(404).json({ error: "Trend not found" });
      }

      res.status(200).json({ message: "Trend deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = trendController;
