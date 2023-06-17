const express = require("express");
const router = express.Router();
const {
  getPost,
  deletePost,

  editPost,
  getPosts,

  addPost,
  getContacts,
} = require("../controllers/api-post-controller");

router.get("/api/posts", getPosts);
router.post("/api/add-post", addPost);
router.get("/api/posts/:id", getPost);
router.delete("/api/posts/:id", deletePost);
router.put("/api/edit/:id", editPost);

router.get("/api/contacts", getContacts);

module.exports = router;
