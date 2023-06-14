const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

const PORT = 3000;

const createPath = (page) =>
  path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server started at port ${PORT}`);
});

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
  res.render(createPath("posts"), { title });
});

app.get("/posts/:id", (req, res) => {
  const title = "Post";
  res.render(createPath("post"), { title });
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
