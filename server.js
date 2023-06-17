const express = require("express");
const path = require("path");
const app = express();
const morgan = require("morgan");
const MethodOverride = require("method-override");
const mongoose = require("mongoose");
const Post = require("./models/post");

app.set("view engine", "ejs");

const PORT = 3000;

const db =
  "mongodb+srv://Maxim:17082004@postsdb.knwlcjn.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("connected to db"))
  .catch((error) => console.log(error));
const createPath = (page) =>
  path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server started at port ${PORT}`);
});

app.use((req, res, next) => {
  console.log(`path: ${req.path}`);
  console.log(`method: ${req.method}`);
  next();
});

app.use(express.static("styles"));

app.use(MethodOverride("_method"));

app.use(morgan(":method :url :status :res[conent-length] - :response-time ms"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.get("/contacts", (req, res) => {
  const title = "Contacts";
  const contacts = [
    { name: "VK", link: "http://vk.com/ggshiglov" },
    { name: "Telegramm", link: "https://t.me/MaximShiglov" },
    { name: "GitHub", link: "https://github.com/maximaizergit" },
  ];
  res.render(createPath("contacts"), { contacts, title });
});

app.get("/posts", (req, res) => {
  const title = "Posts";
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath("posts"), { posts, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/posts/:id", (req, res) => {
  const title = "Post";
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("post"), { post, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.delete("/posts/:id", (req, res) => {
  const title = "Post";
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.post("/add-post", (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect("/posts"))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/edit/:id", (req, res) => {
  const title = "Edit post";
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("edit-post"), { post, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.put("/edit/:id", (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
});

app.get("/add-post", (req, res) => {
  const title = "Add post";
  res.render(createPath("add-post"), { title });
});

app.use((req, res) => {
  const title = "Error";
  res.statusCode = 404;
  res.render(createPath("error"), { title });
});
