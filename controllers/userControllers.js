const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Could not create user" });
  }
};

// Read user profile
exports.getUserProfile = (req, res) => {
  res.status(200).json(req.user);
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await req.user.update({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ error: "Could not update user profile" });
  }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    await req.user.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Could not delete user profile" });
  }
};

// User login
exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (error, user) => {
    if (error) {
      return res.status(500).json({ error: "Login failed" });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Login failed" });
      }
      res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

// User logout
exports.logoutUser = (req, res) => {
  req.logout();
  res.status(200).json({ message: "Logout successful" });
};
