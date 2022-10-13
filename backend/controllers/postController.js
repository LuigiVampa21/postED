const Post = require("../models/postModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/index");

exports.getAllposts = async (req, res) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  let postQuery = Post.find();
  let posts;
  let postCount = await Post.countDocuments();
  if (pageSize && currentPage) {
    posts = await postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    res.status(StatusCodes.OK).json({
      status: "success",
      results: postCount,
      data: posts,
    });
  } else {
    posts = await postQuery;
    res.status(StatusCodes.OK).json({
      status: "success",
      results: postCount,
      data: posts,
    });
  }
};

exports.createPost = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const newPost = await Post.create({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userID,
  });
  res.status(StatusCodes.CREATED).json({
    createdPost: newPost,
  });
};

exports.getSinglePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post)
    throw new CustomError.NotFoundError("Sorry this post does not exists !");
  res.status(StatusCodes.OK).json({
    status: "success",
    data: post,
  });
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  let imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = await Post.findById(id);
  if (post.creator != req.userData.userID) {
    throw new CustomError.UnauthorizeError(
      "Sorry you are not authorized to change this post !"
    );
  }
  const updatedPost = await Post.findByIdAndUpdate(id, {
    title: title,
    content: content,
    imagePath: imagePath,
    creator: req.userData.userID,
  });
  if (!updatedPost)
    throw new CustomError.NotFoundError("Sorry this post does not exists !");
  res.status(StatusCodes.OK).json({
    status: "success",
    data: post,
  });
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (post.creator != req.userData.userID) {
    throw new CustomError.UnauthorizeError(
      "Sorry you are not authorized to delete this post !"
    );
  }
  await Post.findByIdAndDelete(id);
  if (!post)
    throw new CustomError.NotFoundError("Sorry this post does not exists !");
  res.status(StatusCodes.OK).json({
    status: "success",
    data: null,
  });
};
