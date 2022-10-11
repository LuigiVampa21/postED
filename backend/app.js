const express = require("express");
const app = express();

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

app.post("/api/posts", (req, res) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    status: "success",
    data: post,
  });
});

app.use("/api/posts", (req, res) => {
  const posts = [
    {
      id: "12345678",
      title: "zertyuio",
      content: "lorefghjkolpmpkjh",
    },
    {
      id: "12345678",
      title: "zertyuio",
      content: "lorefghjkolpmpkjh",
    },
  ];
  res.status(200).json({
    status: "success",
    data: posts,
  });
});

module.exports = app;
