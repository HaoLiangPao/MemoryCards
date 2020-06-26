const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("../middlewares/async");
const User = require("../models/User");

// @desc        Get all users
// @route       GET /api/v1/users
// @access      Private/Admin
exports.getUsers = AsyncHandler(async (req, res, next) => {
  // Check the authentification

  // Search in the database
  const users = await User.find();

  res.status(200).json({ success: true, count: users.length, data: users });
});
// @desc        Get a single user
// @route       GET /api/v1/users/:id
// @access      Private/Admin
exports.getUser = AsyncHandler(async (req, res, next) => {
  // Check the authentification

  // Search in the database
  const user = await User.findById(req.params.id);
  // Return error if id doesnt exist
  if (!user) {
    return next(
      new ErrorResponse(`No user found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});
// @desc        Create a user
// @route       POST /api/v1/users
// @access      Private/Admin
exports.createUser = AsyncHandler(async (req, res, next) => {
  // Check the authentification

  // Search in the database
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});
// @desc        Update a user
// @route       PUT /api/v1/users/:id
// @access      Private/Admin
exports.updateUser = AsyncHandler(async (req, res, next) => {
  // Check the authentification

  // Search in the database
  const exist = await User.findById(req.params.id);
  // Return error if id doesnt exist
  if (!exist) {
    return next(
      new ErrorResponse(`No user found with id of ${req.params.id}`, 404)
    );
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});
// @desc        Delete a user
// @route       DELETE /api/v1/users/:id
// @access      Private/Admin
exports.deleteUser = AsyncHandler(async (req, res, next) => {
  // Check the authentification

  // Search in the database
  const user = await User.findById(req.params.id);
  // Return error if id doesnt exist
  if (!user) {
    return next(
      new ErrorResponse(`No user found with id of ${req.params.id}`, 404)
    );
  }
  await user.remove();
  res.status(200).json({ success: true, data: {} });
});
