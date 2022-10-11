const Post = require("../models/postModel");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

exports.getAllposts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: posts,
  });
};

exports.createNewPost =
  (multer(storage).single("image"),
  async (req, res) => {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data: newPost,
    });
  });

exports.getSinglePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) throw new Error("Sorry this post does not exists !");
  res.status(200).json({
    status: "success",
    data: post,
  });
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(id, { title, content });
  if (!updatedPost) throw new Error("Sorry this post does not exists !");
  res.status(200).json({
    status: "success",
    data: updatedPost,
  });
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new Error("Sorry this post does not exists !");
  res.status(200).json({
    status: "success",
    data: null,
  });
};
