const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("./async");
const jwt = require("jsonwebtoken");

// Protect Private routes
exports.protect = AsyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers);

  // Make sure a token is passed in and it starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startswith("Bearer")
  ) {
    // Get the token passed within the header
    // Format: Bearer <token>
    token = req.header.authorization.split(" ")[1];
  }
  // If the token is not passed in or it is in an invalid format
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  // Validate the token
  try {
    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    // Add the authorized user into
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
