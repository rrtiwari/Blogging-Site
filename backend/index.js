const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const { router } = require("./router.js");
const { checkAuth } = require("./utils/Auth.js"); // Note: Check if file is auth.js or Auth.js (case sensitive on Linux/Render)
const cors = require("cors");
require("dotenv").config();

// 1. Trust Proxy (CRITICAL for Render)
// This tells Express to trust the HTTPS connection coming from Render's load balancer
app.set("trust proxy", 1);

// Database Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wdovwm2.mongodb.net/Blogging_Page?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. CORS Configuration
app.use(
  cors({
    origin: "https://blogging-site-rho-nine.vercel.app", // Your Vercel URL
    credentials: true, // Essential for sessions to work
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 3. Session Configuration (CRITICAL FIXES HERE)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // MUST be true for HTTPS (Render/Vercel)
      sameSite: "none", // MUST be 'none' to allow cross-site cookies
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(router);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
module.exports = app;
