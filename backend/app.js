require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const Post = require("./models/postModel");
const connectDB = require("./DB/connectDB");
const postRouter = require("./routes/postsRoutes");

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

app.use("/api/posts", postRouter);

module.exports = app;
