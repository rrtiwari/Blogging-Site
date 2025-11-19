const express = require("express");
const router = express.Router();

// CHANGED: Removed signupPage, loginPage, and allUsers from the import
const {
  registerUser,
  login,
  logout,
  checkSession,
} = require("./controllers/userController.js");
const { requireAuth } = require("./utils/Auth.js");
const {
  home,
  myBlog,
  createBlog,
  deleteBlog,
  editBlog,
  updateBlog,
} = require("./controllers/blogController.js");

// Auth Routes
router.get("/check-session", checkSession);
router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);

// Blog Routes
router.get("/", home);
router.get("/myblog", requireAuth, myBlog);
router.post("/createblog", requireAuth, createBlog);
router.post("/updateblog", requireAuth, updateBlog);
router.get("/deleteblog", requireAuth, deleteBlog);
router.get("/editblog", requireAuth, editBlog);

module.exports = { router };
