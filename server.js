// ------ Dependencies Installation ------
// --- Third-party Package
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

// --- Customized Module
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
// router
const collections = require("./routes/memoCollections");

// --- Load Environment Variables
dotenv.config({ path: "./config/config.env" });

// --------- Initiate the application ---------
const app = express();
// Initialize the mongoDB connection
connectDB();

// ------ Calling Middleware Functions --------
// --- 1. Functionality---
// Use body parser
app.use(express.json());
// Dev logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Define the routes
app.use("/api/v1/collections", collections);

// Catch errors
app.use(errorHandler);

// Set & Listen to the port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`.yellow.bold);
});
