const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router
  .route("/")
  .get(postController.getAllposts)
  .post(postController.createNewPost);
router
  .route("/:id")
  .get(postController.getSinglePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
