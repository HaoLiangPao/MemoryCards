const express = require("express");

// Import controller methods
const {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/memoCollections");

// Include other resource routers
const cardRouter = require("./memoCards");

// Initialize the router
const router = express.Router();

// Routes handling
// Re-route into other resource routers
router.use("/:collectionId/memorycards", cardRouter);

// Define the routes
router.route("/").get(getCollections).post(createCollection);

router.route("/:id").put(updateCollection).delete(deleteCollection);

// Export the router
module.exports = router;
