const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const Post = require("../models/postModel");

router.route("/").get(postController.getAllposts);
// .post(postController.createNewPost);

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

router.post("/", multer({ storage: storage }).single("image"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      data: {
        id: createdPost._id,
        title: createdPost.title,
        content: createdPost.content,
        imagePath: createdPost.imagePath,
      },
    });
  });
});

router
  .route("/:id")
  .get(postController.getSinglePost)
  // .patch(postController.updatePost)
  .delete(postController.deletePost);

router.patch(
  "/:id",
  multer({ storage: storage }).single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    let imagePath;
    if(req.file){
      const url = req.protocol + "://" + req.get('host');
      imagePath = url + '/images/' + req.file.filename 
    }
    const updatedPost = await Post.findByIdAndUpdate(id, {
      title: title,
      content: content,
      imagePath: imagePath,
    });
    if (!updatedPost) throw new Error("Sorry this post does not exists !");
    res.status(200).json({
      status: "success",
      data: updatedPost,
    });
  }
);

module.exports = router;
