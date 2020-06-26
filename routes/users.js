const express = require("express");

// Import controller methods
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/users");

// Initialize router
const router = express.Router();

// Define routes
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
