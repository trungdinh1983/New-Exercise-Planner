const { Instruction } = require("../models");

const instructionController = {
  // Create a new instruction
  createInstruction: async (req, res) => {
    try {
      const newInstruction = await Instruction.create(req.body);
      res.status(201).json(newInstruction);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get all instructions
  getAllInstructions: async (req, res) => {
    try {
      const instructions = await Instruction.findAll({
        where: {
          deletedAt: null, // Soft delete check
        },
      });
      res.status(200).json(instructions);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Get a single instruction by ID
  getInstructionById: async (req, res) => {
    try {
      const instruction = await Instruction.findOne({
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (!instruction) {
        return res.status(404).json({ error: "Instruction not found" });
      }

      res.status(200).json(instruction);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Update an instruction
  updateInstruction: async (req, res) => {
    try {
      const updated = await Instruction.update(req.body, {
        where: {
          id: req.params.id,
          deletedAt: null, // Soft delete check
        },
      });

      if (updated[0] === 0) {
        return res.status(404).json({ error: "Instruction not found" });
      }

      res.status(200).json({ message: "Instruction updated" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Soft delete an instruction
  deleteInstruction: async (req, res) => {
    try {
      const deleted = await Instruction.update(
        { deletedAt: new Date() },
        {
          where: {
            id: req.params.id,
            deletedAt: null, // Soft delete check
          },
        }
      );

      if (deleted[0] === 0) {
        return res.status(404).json({ error: "Instruction not found" });
      }

      res.status(200).json({ message: "Instruction deleted" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

module.exports = instructionController;
