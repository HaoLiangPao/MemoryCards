const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  role: {
    type: String,
    default: "user", // administration accounts should be manually changed in database
  },
  password: {
    type: String,
    require: [true, "Please add a password"],
    minlength: 6,
    select: false, // when getting a user from database, it will not be selected
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before a User document is saved to the database
UserSchema.pre("save", async function () {
  // Larger the salt is, longer the hash algorithum takes
  const salt = await bcrypt.genSalt(10);
  // Set the password to the hashed value
  this.password = await bcrypt.hash(this.password, salt);
});

// For Authentification : Compare the password with the hashed ones in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// For Authorization: Create a Json Webtoken
UserSchema.methods.getSignedJwtToken = function () {
  // Sign the token with JWT secret
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", UserSchema);
