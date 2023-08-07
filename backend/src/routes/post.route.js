const express = require("express");
const router = express.Router();
const {
  getPosts,
  addPost,
  deletePost,
} = require("../controllers/post.controller");

router.route("/getposts").get(getPosts);
router.route("/addpost").post(isLoggedIn, addPost);
router.route("/delete/:id").delete(isLoggedIn, deletePost);

module.exports = router;
