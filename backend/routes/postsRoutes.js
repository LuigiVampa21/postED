// const express = require("express");
// const router = express.Router();
// const postController = require("../controllers/postController");
// const Post = require("../models/postModel");
// const { StatusCodes } = require("http-status-codes");
// const CustomError = require("../errors/index");
// const authMiddleware = require("../middleware/authMiddleware");

// router.route("/").get(postController.getAllposts);
// // .post(postController.createNewPost);

// const multer = require("multer");
// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg",
// };
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().split(" ").join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   },
// });

// router.post(
//   "/",
//   authMiddleware.checkToken,
//   multer({ storage: storage }).single("image"),
//   (req, res) => {
//     const url = req.protocol + "://" + req.get("host");
//     const post = new Post({
//       title: req.body.title,
//       content: req.body.content,
//       imagePath: url + "/images/" + req.file.filename,
//       creator: req.userData.userID,
//     });
//     post.save().then((createdPost) => {
//       res.status(StatusCodes.CREATED).json({
//         data: {
//           id: createdPost._id,
//           title: createdPost.title,
//           content: createdPost.content,
//           imagePath: createdPost.imagePath,
//         },
//       });
//     });
//   }
// );

// router
//   .route("/:id")
//   .get(postController.getSinglePost)
//   // .patch(postController.updatePost)
//   .delete(authMiddleware.checkToken, postController.deletePost);

// router.patch(
//   "/:id",
//   authMiddleware.checkToken,
//   multer({ storage: storage }).single("image"),
//   async (req, res) => {
//     const { id } = req.params;
//     const { title, content } = req.body;
//     let imagePath;
//     if (req.file) {
//       const url = req.protocol + "://" + req.get("host");
//       imagePath = url + "/images/" + req.file.filename;
//     }
//     const post = await Post.findById(id);
//     if (post.creator != req.userData.userID) {
//       throw new CustomError.UnauthorizeError("Sorry you are not authorized to change this post !");
//     }
//     const updatedPost = await Post.findByIdAndUpdate(id, {
//       title: title,
//       content: content,
//       imagePath: imagePath,
//       creator: req.userData.userID,
//     });
//     if (!updatedPost) throw new CustomError.NotFoundError("Sorry this post does not exists !");
//     res.status(StatusCodes.OK).json({
//       status: "success",
//       data: post,
//     });
//   }
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");
const mutlterMiddleware = require("../middleware/multer");

router
  .route("/")
  .get(postController.getAllposts)
  .post(
    authMiddleware.checkToken,
    mutlterMiddleware.multerM,
    postController.createPost
  );

// const multer = require("multer");
// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpg",
//   "image/jpg": "jpg",
// };
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname.toLowerCase().split(" ").join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     cb(null, name + "-" + Date.now() + "." + ext);
//   },
// });

// router.post(
//   "/",
//   authMiddleware.checkToken,
//   mutlterMiddleware.multerM,
//   postController.createPost
// multer({ storage: storage }).single("image"),
// (req, res) => {
//   const url = req.protocol + "://" + req.get("host");
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//     imagePath: url + "/images/" + req.file.filename,
//     creator: req.userData.userID,
//   });
//   post.save().then((createdPost) => {
//     res.status(StatusCodes.CREATED).json({
//       data: {
//         id: createdPost._id,
//         title: createdPost.title,
//         content: createdPost.content,
//         imagePath: createdPost.imagePath,
//       },
//     });
//   });
// }
// );

router
  .route("/:id")
  .get(postController.getSinglePost)
  .patch(
    authMiddleware.checkToken,
    mutlterMiddleware.multerM,
    postController.updatePost
  )
  .delete(authMiddleware.checkToken, postController.deletePost);

// router.patch(
//   "/:id",
//   authMiddleware.checkToken,
//   mutlterMiddleware.multerM,
//   postController.updatePost
// multer({ storage: storage }).single("image"),
// async (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;
//   let imagePath;
//   if (req.file) {
//     const url = req.protocol + "://" + req.get("host");
//     imagePath = url + "/images/" + req.file.filename;
//   }
//   const post = await Post.findById(id);
//   if (post.creator != req.userData.userID) {
//     throw new CustomError.UnauthorizeError(
//       "Sorry you are not authorized to change this post !"
//     );
//   }
//   const updatedPost = await Post.findByIdAndUpdate(id, {
//     title: title,
//     content: content,
//     imagePath: imagePath,
//     creator: req.userData.userID,
//   });
//   if (!updatedPost)
//     throw new CustomError.NotFoundError("Sorry this post does not exists !");
//   res.status(StatusCodes.OK).json({
//     status: "success",
//     data: post,
//   });
// }
// );

module.exports = router;
