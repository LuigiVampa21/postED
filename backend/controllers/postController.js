const Post = require("../models/postModel");

exports.getAllposts = async (req, res) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  // console.log(pageSize, currentPage);
  let postQuery = Post.find();
  let posts;
  let postCount = await Post.countDocuments();
  console.log(postCount);
  if (pageSize && currentPage) {
    posts = await postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    // console.log("pageSize");
    // console.log(posts.length);
    res.status(200).json({
      status: "success",
      results: postCount,
      data: posts,
    });
  } else {
    posts = await postQuery;
    // console.log("NopageSize");
    res.status(200).json({
      status: "success",
      results: postCount,
      data: posts,
    });
  }
  // const posts = await Post.find({});
  // console.log(posts);
};
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

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new Error("Sorry this post does not exists !");
  res.status(200).json({
    status: "success",
    data: null,
  });
};

// -------------------------------------------------------

// initial controllers => to update ::

// exports.createNewPost = async (req, res) => {
//   // upload.single('img');
//   multer({ storage: storage }).single("image");
//   const newPost = await Post.create(req.body);
//   res.status(201).json({
//     status: "success",
//     data: newPost,
//   });
// };

// -------------------------------------------------------

// exports.updatePost = async (req, res) => {
//   const { id } = req.params;
//   const { title, content, imagePath } = req.body;
//   const updatedPost = await Post.findByIdAndUpdate(id, {
//     title: title,
//     content: content,
//     imagePath: imagePath,
//   });
//   if (!updatedPost) throw new Error("Sorry this post does not exists !");
//   res.status(200).json({
//     status: "success",
//     data: updatedPost,
//   });
// };
