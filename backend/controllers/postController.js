const Post = require("../models/postModel");

exports.getAllposts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: posts,
  });
};

// exports.createNewPost = async (req, res) => {
//   // upload.single('img');
//   multer({ storage: storage }).single("image");
//   const newPost = await Post.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: newPost,
//   });
// };

exports.getSinglePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) throw new Error("Sorry this post does not exists !");
  console.log(post);
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
