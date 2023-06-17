const Post = require("../models/post");

const handleError = (res, error) => {
  res.status(500), send(error);
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};
const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(req.params.id, { title, author, text })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};
const getContacts = (req, res) => {
  const contacts = [
    { name: "VK", link: "http://vk.com/ggshiglov" },
    { name: "Telegramm", link: "https://t.me/MaximShiglov" },
    { name: "GitHub", link: "https://github.com/maximaizergit" },
  ];
  res.status(200).json(contacts);
};

module.exports = {
  getContacts,
  getPost,
  deletePost,

  editPost,
  getPosts,

  addPost,
};
