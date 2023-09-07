const { User } = require("../models"); // Import User model
const bcrypt = require("bcrypt"); // For password hashing
const passport = require("passport"); // For authentication

// Create a new user
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password_digest: hashedPassword,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Login
const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json(info);

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json(user);
    });
  })(req, res, next);
};

// Logout
const logoutUser = (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logged out" });
};

// Get all users (considering soft deletes)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ where: { deletedAt: null } });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get a single user by ID (considering soft deletes)
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, deletedAt: null } });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findByPk(id);

    if (!user || user.deletedAt) return res.status(404).json({ message: "User not found" });

    user.name = name;
    user.email = email;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Soft delete a user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.deletedAt = new Date();
    await user.save();

    res.status(200).json({ message: "User soft deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
