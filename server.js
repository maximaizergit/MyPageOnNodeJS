const express = require("express");
const path = require("path");
const app = express();

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, "views", `${page}.html`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server started at port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(createPath("index"));
});

app.get("/contacts", (req, res) => {
  res.sendFile(createPath("contacts"));
});

app.get("/posts", (req, res) => {
  res.sendFile(createPath("contacts"));
});

app.get("/posts/:id", (req, res) => {
  res.sendFile(createPath("contacts"));
});

app.get("/add-post", (req, res) => {
  res.sendFile(createPath("contacts"));
});

app.use((req, res) => {
  res.statusCode = 404;
  res.sendFile(createPath("error"));
});
