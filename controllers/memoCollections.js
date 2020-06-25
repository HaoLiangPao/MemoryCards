const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("../middlewares/async");
const MemoCollection = require("../models/MemoCollection");

// @desc        Get all collections
// @route       GET /api/v1/collections
// @access      Public
exports.getCollections = AsyncHandler(async (req, res, next) => {
  const collections = await MemoCollection.find();
  res
    .status(200)
    .json({ success: true, count: collections.length, data: collections }); // could get results send by this middleware function in this way
});

// @desc        Create a collection
// @route       POST /api/v1/collections
// @access      Private
exports.createCollection = AsyncHandler(async (req, res, next) => {
  // Check if the user is logged in

  // Create a memroy card collection based on the information passed within the url body

  res.status(200).json({ success: true, message: "Create a collection" }); // could get results send by this middleware function in this way
});

// @desc        Update a collection
// @route       PUT /api/v1/collections/:id
// @access      Private
exports.updateCollection = AsyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Update a collection" }); // could get results send by this middleware function in this way
});

// @desc        Delete a collection
// @route       GET /api/v1/collections:/id
// @access      Private
exports.deleteCollection = AsyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Delete a collection" }); // could get results send by this middleware function in this way
});
