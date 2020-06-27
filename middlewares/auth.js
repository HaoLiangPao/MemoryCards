const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("./async");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect Private routes
exports.protect = AsyncHandler(async (req, res, next) => {
  let token;

  // Make sure a token is passed in and it starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Get the token passed within the header
    // Format: Bearer <token>
    token = req.headers.authorization.split(" ")[1];
  }
  // If the token is not passed in or it is in an invalid format
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  // Validate the token
  try {
    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET); // will throw error if not verified
    // Add the authorized user info to the request
    req.user = await User.findById(payload.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
