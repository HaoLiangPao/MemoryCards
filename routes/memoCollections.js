const express = require("express");

// Import controller methods
const { getCollections } = require("../controllers/memoCollections");

// Initialize the router
const router = express.Router();

// Define the routes
router.route("/").get(getCollections);

// Export the router
module.exports = router;
