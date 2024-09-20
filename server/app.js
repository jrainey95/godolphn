const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes");
const connection = require("./config/database");

// Load environment variables from .env file
require("dotenv").config();

// Initialize the Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Adjust this to the actual frontend URL
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Session setup
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET, // Secret for signing the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Save uninitialized sessions
    store: sessionStore,
    cookie: { secure: false },
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Import Passport configuration
require("./config/passport");

// Logging for debugging
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// Route handling
app.use(routes);

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
