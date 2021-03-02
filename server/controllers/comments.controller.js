const Comment = require("../models/Comment");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const commentsController = {};

commentsController.create = catchAsync(async (req, res) => {
  const comment = await Comment.create({
    owner: req.userId,
    body: req.body.body,
    post: req.body.postId,
  });

  // const post = await Post.find({id_: comment.post})
  // post.comments.push
  res.json(comment);
});

commentsController.read = async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.id }).populate(
    "owner"
  );
  if (!comment) {
    res.status(404).json({ message: "Comment not Found" });
  } else {
    res.json(comment);
  }
};

commentsController.update = async (req, res) => {
  await Comment.findByIdAndUpdate(
    { _id: req.params.id },
    { email: req.body.email },
    { new: true },
    (err, comment) => {
      console.log({ err, comment });
      if (!comment) {
        res.status(404).json({ message: "Comment not Found" });
      } else {
        res.json(comment);
      }
    }
  );
};

commentsController.destroy = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (!comment) {
      res.status(404).json({ message: "Comment not Found" });
    } else {
      res.json(comment);
    }
  });
};

commentsController.list = async (req, res) => {
  await Comment.find({}, (err, comments) => {
    console.log({ comments });
    if (!comments) {
      res.status(404).json({ message: "Comment not Found" });
    } else {
      res.json(comments);
    }
  });
};

module.exports = commentsController;
