// ------ Dependencies Installation ------
// Third-party Package
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

// Customized Module
const connectDB = require("./config/db");

// Load Environment Variables
dotenv.config({ path: "./config/config.env" });

// Initiate the application
const app = express();
// Initialize the mongoDB connection
connectDB();

// Set & Listen to the port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`.yellow.bold);
});
