const express = require("express");

// Import controller methods
const { register } = require("../controllers/auth");

// Initialize the router
const router = express.Router();

// Define the routes
router.post("/register", register);

// Export the router
module.exports = router;
