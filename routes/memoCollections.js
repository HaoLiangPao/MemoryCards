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

// --- Middleware functions ---
const { protect } = require("../middlewares/auth");

// Routes handling
// Re-route into other resource routers
router.use("/:collectionId/memorycards", cardRouter);

// Define the routes
router.route("/").get(getCollections).post(protect, createCollection);

router
  .route("/:id")
  .put(protect, updateCollection)
  .delete(protect, deleteCollection);

// Export the router
module.exports = router;
