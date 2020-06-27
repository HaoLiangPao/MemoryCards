const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("../middlewares/async");
const User = require("../models/User");

// @desc          Register a User
// @route         POST /api/v1/auth/register
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
// @route         POST /api/v1/auth/login
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
// @desc        Log out a user
// @route       POST /api/v1/auth/logout
// @access      Private
exports.logout = AsyncHandler(async (req, res, next) => {
  // Clear cookies
  res.cookie("MemoryToken", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, msg: "User logged out" });

  // // Relatively we can delete cookie as well
  // res.clearCookie('MemoryToken');
  // res.status(200).json({ success: true, msg: "User logged out, CookieCleared" });
});
// @desc        Get current logged in user
// @route       GET /api/v1/auth/me
// @access      Private
exports.getMe = AsyncHandler(async (req, res, next) => {
  // Fetch id of a logged-in user
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});
// @desc        Update detailed information of a user
// @route       PUT /api/v1/auth/updatedetails
// @access      Private
exports.updateDetails = AsyncHandler(async (req, res, next) => {
  // (No need to check if the user exist since it is a protected route)
  // Only email and name are changable, password should be changed in another way
  const filedsToChange = {
    name: req.body.name,
    email: req.body.email,
  };
  // Get user from authorized header
  const user = await User.findByIdAndUpdate(req.user.id, filedsToChange, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});
// @desc        Update password of a user
// @route       PUT /api/v1/auth/updatepassword
// @access      Private
exports.updatePassword = AsyncHandler(async (req, res, next) => {
  // (No need to check if the user exist since it is a protected route)
  // Get current user in the database (so we can use static methods to match current password)
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Current password is incorrect", 401));
  }
  // Set the new password
  user.password = req.body.newPassword;
  // Save to the database (password will be hashed before changed to the database)
  await user.save();
  // Auto login after it changes the password
  sendTokenResponse(user, 200, res);
});

// --- Helper Function ---
// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // call static methods to generate a token
  const token = user.getSignedJwtToken();
  // Generate cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 1000
    ),
    httpOnly: true, // only accessible from client script?
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  // Send back the response
  res
    .status(statusCode)
    .cookie("MemoryToken", token, options)
    .json({ success: true, token });
};
