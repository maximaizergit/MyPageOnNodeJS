const express = require("express");
const createPath = require("./helpers/create-path");
const app = express();
const postApiRoutes = require("./routes/api-post-routes");
const morgan = require("morgan");
const MethodOverride = require("method-override");
const mongoose = require("mongoose");

const postRoutes = require("./routes/post-routes");

app.set("view engine", "ejs");

const PORT = 3000;

const db =
  "mongodb+srv://Maxim:17082004@postsdb.knwlcjn.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("connected to db"))
  .catch((error) => console.log(error));

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

app.use(postRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
  const title = "Error";
  res.statusCode = 404;
  res.render(createPath("error"), { title });
});
