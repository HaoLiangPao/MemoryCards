const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("../middlewares/async");
const MemoCollection = require("../models/MemoCollection");

// @desc        Get all collections
// @route       GET /api/v1/collections
// @access      Public
exports.getCollections = AsyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, message: "get all collections" }); // could get results send by this middleware function in this way
});
