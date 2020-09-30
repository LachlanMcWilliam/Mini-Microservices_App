const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//As this is a project simply for demo purposes, data will simply be stored in memory
const commentsByPostId = {};

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];

  comments.push({ commentId, content });

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { commentId, content, postId }
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log({ event: req.body.type });
  res.send({});
});

app.listen(4001, () => {
  console.log("Comments service is listening on port: 4001");
});
