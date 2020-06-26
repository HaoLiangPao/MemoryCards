const mongoose = require("mongoose");

const MemoCardSchema = new mongoose.Schema({
  FrontText: {
    type: String,
    require: [true, "Please add content to the FRONT_SIDE of the card."],
  },
  FrontImg: {
    type: String,
    default: "no-photo.jpg",
  },
  BackText: {
    type: String,
    require: [true, "Please add content to the BACK_SIDE of the card."],
  },
  BackImg: {
    type: String,
    default: "no-photo.jpg",
  },
  familiarity: {
    type: Number,
    default: 1,
    min: [1, "Familarity must be at least 1"],
    max: [10, "Familarity must be at most 10"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  cardCollection: {
    type: mongoose.Schema.ObjectId,
    ref: "Collection",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("MemoCard", MemoCardSchema);
