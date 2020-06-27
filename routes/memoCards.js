const express = require("express");

// Import endpoint methods from controller folder
const {
  getMemoCards,
  getMemoCard,
  updateMemoCard,
  deleteMemoCard,
  createMemoCard,
} = require("../controllers/memoCards");

// Take care of redirecting routes from Bootcamp router
const router = express.Router({ mergeParams: true }); // merge url params from collections

// --- Middleware Functions ---
const { protect } = require("../middlewares/auth");

// Connect routes with endpoint methods
router.route("/").get(getMemoCards).post(protect, createMemoCard);
router
  .route("/:id")
  .get(getMemoCard)
  .put(protect, updateMemoCard)
  .delete(protect, deleteMemoCard);

// Export the router
module.exports = router;
