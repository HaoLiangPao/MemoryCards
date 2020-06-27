const express = require("express");

// Import controller methods
const { register, login } = require("../controllers/auth");

// Initialize the router
const router = express.Router();

// Define the routes
router.post("/register", register);
router.post("/login", login);

// Export the router
module.exports = router;
