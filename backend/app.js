require("dotenv").config();
require("express-async-errors");
const path = require("path");

const express = require("express");
const app = express();

const Post = require("./models/postModel");
const connectDB = require("./DB/connectDB");
const postRouter = require("./routes/postsRoutes");
const authRouter = require("./routes/authRoutes");
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler')

connectDB(process.env.MONGO_URI);

app.use("/images", express.static(path.join("backend/images")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorizations"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
