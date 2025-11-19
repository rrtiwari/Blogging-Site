const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const { router } = require("./router.js");
const { checkAuth } = require("./utils/Auth.js");
const cors = require("cors"); // Import CORS
require("dotenv").config();

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

// Allow React to access backend (Assuming React runs on port 5173)
app.use(
  cors({
    origin: "http://localhost:5173", // Your React URL
    credentials: true, // Essential for sessions to work
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using https
  })
);

// We don't need app.set('view engine') anymore!
// app.use(checkAuth); // You can handle auth checks inside specific routes or keep this

app.use(router);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
module.exports = app;
