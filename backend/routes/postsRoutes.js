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

router
  .route("/:id")
  .get(postController.getSinglePost)
  .patch(
    authMiddleware.checkToken,
    mutlterMiddleware.multerM,
    postController.updatePost
  )
  .delete(authMiddleware.checkToken, postController.deletePost);

module.exports = router;
