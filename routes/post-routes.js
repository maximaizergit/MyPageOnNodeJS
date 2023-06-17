const express = require("express");
const router = express.Router();
const {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost,
  getContacts,
} = require("../controllers/post-controller");

router.get("/contacts", getContacts);
router.get("/posts/:id", getPost);
router.delete("/posts/:id", deletePost);
router.get("/edit/:id", getEditPost);
router.put("/edit/:id", editPost);
router.get("/posts", getPosts);
router.get("/add-post", getAddPost);
router.post("/add-post", addPost);

module.exports = router;
