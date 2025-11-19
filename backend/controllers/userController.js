const bcrypt = require("bcrypt");
const Users = require("../models/users.js");

// Signup/Login PAGE GET requests are handled by React Router now.
// We only need the POST logic here.

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newuser = new Users({ name, email, password: hashPassword });
    await newuser.save();
    res.json({ success: true, message: "User created Successfully!" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "Email not registered" });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (passwordMatch) {
      req.session.userid = existingUser._id;
      req.session.save(); // Ensure session is saved
      return res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid Password!" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Logged out" });
  });
};

// Create a new endpoint to check if user is logged in (React needs this)
const checkSession = (req, res) => {
  if (req.session.userid) {
    res.json({ isAuthenticated: true, user: req.session.userid });
  } else {
    res.json({ isAuthenticated: false });
  }
};

module.exports = { registerUser, login, logout, checkSession };
