const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("../middlewares/async");
const User = require("../models/User");

// @desc          Register a User
// @route         POST /api/v1/auth
// @access        Public
exports.register = AsyncHandler(async (req, res, next) => {
  // Destructure data from req body
  const { name, email, password, role } = req.body;

  // Add the user to the database
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Helper Function: Add JWT authorization to the response
  sendTokenResponse(user, 200, res);
});
// @desc          Login a User
// @route         POST /api/v1/login
// @access        Public
exports.login = AsyncHandler(async (req, res, next) => {
  // -- Authentification --
  // Destructuring user information
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Compare the email and password with records in database
  const user = await User.findOne({ email }).select("+password"); // default to hide in User schema
  if (!user) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials`, 401));
  }

  // Helper Function: Add JWT authorization to the response
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // call static methods to generate a token
  const token = user.getSignedJwtToken();
  // Generate cookies

  // Send back the response
  res.status(statusCode).json({ success: true, token });
};
