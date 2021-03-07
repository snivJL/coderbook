const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Reaction = require("../models/Reaction");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");

const postController = {};

postController.create = catchAsync(async (req, res) => {
  const post = await await Post.create({ owner: req.userId, ...req.body });
  await post.populate("owner");
  await post.execPopulate();
  res.json(post);
});

postController.readAll = catchAsync(async (req, res, next) => {
  let author = req.query.author;
  let post = {};
  author
    ? (post = await Post.find({ owner: author })
        .populate("owner")
        .populate({
          path: "comments",
          populate: { path: "owner", model: "User" },
        })
        .populate("reactions"))
    : (post = await Post.find({})
        .populate("owner")
        .populate({
          path: "comments",
          populate: { path: "owner", model: "User" },
        })
        .populate({
          path: "reactions",
          populate: { path: "owner", model: "User" },
        }));
  if (!post)
    return next(new AppError(404, "Posts not found", "Get All Posts Error"));
  if (req.query.content) {
    let content = req.query.content.$regex;

    post = post.filter((p) => p.body.includes(content));
  }
  const pageCount = Math.ceil(post.length / 10);
  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }
  let sortBy = req.query.sortBy;
  if (sortBy) post.sort((a, b) => b.createdAt - a.createdAt);

  res.json({
    page: page,
    pageCount: pageCount,
    numPosts: post.length,
    posts: post.slice(page * 10 - 10, page * 10),
    searched: req.query.content ? true : false,
  });
});

postController.read = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post)
    return next(new AppError(404, "Post not found", "Get Single Post Error"));

  await post.populate("owner").populate("comments");
  await post.execPopulate();

  res.json(post);
});

postController.update = catchAsync(async (req, res) => {
  await Post.findByIdAndUpdate(
    req.params.id,
    { body: req.body.content },
    { new: true },
    (err, post) => {
      console.log({ err, post });
      if (!post) {
        res.status(404).json({ message: "Post not Found" });
      } else {
        res.json(post);
      }
    }
  );
});

postController.destroy = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (!post) {
      res.status(404).json({ message: "Post not Found" });
    } else {
      res.json(post);
    }
  });
});

postController.createComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.create({
    body: req.body.body,
    owner: req.userId,
    post: req.params.id,
  });
  const post = await Post.findById(req.params.id);
  post.comments.push(comment._id);

  await post.save();
  await post.populate("comments");
  await post.execPopulate();
  return sendResponse(res, 200, true, { post }, null, "Comment created!");
});

postController.createReaction = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const reaction = await Reaction.create({
    type: req.body.targetType,
    reaction: req.body.body,
    owner: req.userId,
  });
  const post = await Post.findById(req.params.id);
  post.reactions.push(reaction);

  await post.save();
  await post.populate({
    path: "reactions",
    populate: { path: "owner", model: "User" },
  });
  await post.execPopulate();
  return sendResponse(res, 200, true, { post }, null, "Reaction created!");
});

postController.list = catchAsync(async (req, res) => {
  return sendResponse(
    res,
    200,
    true,
    { posts: [{ foo: "bar" }] },
    null,
    "Login successful"
  );
});

module.exports = postController;
