const express = require("express");

// Import controller methods
const {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/memoCollections");

// Initialize the router
const router = express.Router();

// Define the routes
router.route("/").get(getCollections).post(createCollection);

router.route("/:id").put(updateCollection).delete(deleteCollection);

// Export the router
module.exports = router;
