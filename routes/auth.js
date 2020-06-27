const express = require("express");

// Import controller methods
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
} = require("../controllers/auth");

// Initialize the router
const router = express.Router();

// --- Middleware Functions
const { protect } = require("../middlewares/auth");

// Define the routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);

// Export the router
module.exports = router;
