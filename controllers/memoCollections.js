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
  const collection = await MemoCollection.create(req.body);
  res.status(201).json({
    success: true,
    message: `Collection(id:${collection.id}) is created`, // _id and id both works
    data: collection,
  }); // could get results send by this middleware function in this way
});

// @desc        Update a collection
// @route       PUT /api/v1/collections/:id
// @access      Private
exports.updateCollection = AsyncHandler(async (req, res, next) => {
  // Check if the collection exist
  const exist = await MemoCollection.findById(req.params.id);

  if (!exist) {
    return next(
      new ErrorResponse(`No collection found with id of ${req.params.id}`, 404)
    );
  }
  const collection = await MemoCollection.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidator: true,
    }
  );

  res.status(200).json({
    success: true,
    message: `Collection(id:${req.params.id}) is updated`,
    data: collection,
  });
});

// @desc        Delete a collection
// @route       GET /api/v1/collections:/id
// @access      Private
exports.deleteCollection = AsyncHandler(async (req, res, next) => {
  // Check if the collection exist
  const collection = await MemoCollection.findById(req.params.id);
  if (!collection) {
    return next(
      new ErrorResponse(`No collection found with id of ${req.params.id}`, 404)
    );
  }
  await collection.remove();

  res.status(200).json({
    success: true,
    message: `Collection(id:${req.params.id}) deleted`,
    data: {},
  });
});
