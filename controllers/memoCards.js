const ErrorResponse = require("../utils/ErrorResponse");
const AsyncHandler = require("../middlewares/async");
const MemoCard = require("../models/MemoCard");
const MemoCollection = require("../models/MemoCollection");

// @desc          Get all memory cards
// @route 1       GET /api/v1/memorycards
// @route 2       GET /api/v1/collections/:collectionId/memorycards
// @access        Private
exports.getMemoCards = AsyncHandler(async (req, res, next) => {
  let query;
  if (req.params.collectionId) {
    // Check if the collection exist
    const collection = await MemoCollection.findById(req.params.collectionId);
    if (!collection) {
      return next(
        new ErrorResponse(
          `No collection found with id of ${req.params.collectionId}`,
          404
        )
      );
    }
    query = MemoCard.find({ collection: req.params.collectionId });
  } else {
    query = MemoCard.find();
  }
  const cards = await query;
  res.status(200).json({ success: true, count: cards.length, data: cards });
});

// @desc          Get a single memory card
// @route         GET /api/v1/memorycards/:id
// @access        Private
exports.getMemoCard = AsyncHandler(async (req, res, next) => {
  // Check authority of the user

  // Search the card in database
  const card = MemoCard.findById(req.params.id);
  if (!card) {
    return next(
      new ErrorResponse(`No cards found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: card });
});

// // @desc          Get a single memory card
// // @route         GET /api/v1/collections/:collectionId/memorycards/:cardId
// // @access        Private
// exports.getMemoCard = AsyncHandler(async (req, res, next) => {
//   if (req.params.collectionId) {
//     // Check if the collection exist
//     const collection = await MemoCollection.findById(req.params.collectionId);
//     if (!collection) {
//       return next(
//         new ErrorResponse(
//           `No collection found with id of ${req.params.collectionId}`,
//           404
//         )
//       );
//     }
//     const card = MemoCard.find(
//       { collection: req.params.collectionId },
//       (err, res) => {
//         // Get all cards belongs to the specific collection
//         const cardIDSet = res.map((card) => card._id);
//         // Check if the given id is from this id set
//         if (cardIDSet.includes(req.params.cardId)) {
//           const card = MemoCard.findById(req.params.cardId);
//           res.status(200).json({ success: true, data: card });
//         } else {
//           return next(
//             new ErrorResponse(
//               `No card found with id of ${req.params.cardId}`,
//               404
//             )
//           );
//         }
//       }
//     );
//   } else {
//     return next(
//       new ErrorResponse(`Please provide a collectionID of the memory card`, 400)
//     );
//   }
// });
// @desc          Create a memory card
// @route         POST /api/v1/collections/:collectionId/memorycards
// @access        Private
exports.createMemoCard = AsyncHandler(async (req, res, next) => {
  // Check authentification of the card

  // Add collection to the body for creation
  req.body.cardCollection = req.params.collectionId;
  // Check if the collection exist
  const collection = await MemoCollection.findById(req.params.collectionId);
  if (!collection) {
    return next(
      new ErrorResponse(
        `No collection found with id of ${req.params.collectionId}`,
        404
      )
    );
  }
  // Make sure the logged in user is the owner of the bootcamp
  const card = await MemoCard.create(req.body);
  res.status(201).json({ success: true, data: card });
});
// @desc          Update a memory card
// @route         PUT /api/v1/memorycards/:id
// @access        Private
exports.updateMemoCard = AsyncHandler(async (req, res, next) => {
  // Check authentification of the card

  const exist = await MemoCard.findById(req.params.id);
  if (!exist) {
    return next(
      new ErrorResponse(`No card found with id of ${req.params.id}`, 404)
    );
  }
  const card = await MemoCard.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: card });
});
// @desc          Delete a memory card
// @route         DELETE /api/v1/memorycards/:id
// @access        Private
exports.deleteMemoCard = AsyncHandler(async (req, res, next) => {
  // Check authentification of the card
  const card = await MemoCard.findById(req.params.id);
  if (!card) {
    return next(
      new ErrorResponse(`No card found with id of ${req.params.id}`, 404)
    );
  }
  await card.remove();
  res.status(200).json({ success: true, data: {} });
});
