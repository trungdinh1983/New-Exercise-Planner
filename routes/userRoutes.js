// Importing required modules
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register a new user
// Changed 'register' to 'createUser' to match the controller
router.post("/register", userController.createUser);

// User login
// Changed 'login' to 'loginUser' to match the controller
router.post("/login", userController.loginUser);

// User logout
// Changed 'logout' to 'logoutUser' to match the controller
router.post("/logout", userController.logoutUser);

// Update user password
router.put("/updatePassword", userController.updateUserPassword);

// Get user by ID
// Changed 'getUser' to 'getUserProfile' to match the controller
router.get("/:id", userController.getUserProfile);

// Update user by ID
// Changed 'updateUser' to 'updateUserProfile' to match the controller
router.put("/:id", userController.updateUserProfile);

// Delete user by ID
// Changed 'deleteUser' to 'deleteUserProfile' to match the controller
router.delete("/:id", userController.deleteUserProfile);

// Exporting the router to be used in app.js or index.js
module.exports = router;
