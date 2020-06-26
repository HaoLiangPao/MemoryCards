const mongoose = require("mongoose");

const MemoCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a collection name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  // priority: {
  //   type: Number,
  //   required: [true, "Please add a priority"],
  //   min: [1, "Priority must be at least 1"],
  //   max: [10, "Priority must be at most 10"],
  // },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  memoCards: {
    type: mongoose.Schema.ObjectId,
    ref: "MemoCard",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MemoCollection", MemoCollectionSchema);
