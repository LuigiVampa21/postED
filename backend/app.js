require("dotenv").config();

const express = require("express");
const app = express();

const Post = require("./models/postModel");
const connectDB = require("./DB/connectDB");

connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", async (req, res) => {
  const newPost = await Post.create(req.body);
  res.status(201).json({
    status: "success",
    data: newPost,
  });
});

app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: posts,
  });
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = app;
