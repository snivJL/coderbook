const Comment = require("../models/Comment");

// We don't use AppError & sendResponse in this controller.
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const reactionsController = {};

reactionsController.create = catchAsync(async (req, res, next) => {
  await Reactions.find({}, (err, comments) => {
    if (!comments) {
      res.status(404).json({ message: "Comments not found." });
    } else {
      res.json(comments);
    }
  });
});

module.exports = reactionsController;
