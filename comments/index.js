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

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;

  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id, content, status: "pending" });

  commentsByPostId[postId] = comments;

  await axios.post("http://event-bus-srv/events", {
    type: "CommentCreated",
    data: {
      id,
      postId,
      content,
      status: "pending"
    }
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log({ event: req.body.type });

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status, content } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => {
      return comment.id == id;
    });

    comment.status = status;

    await axios.post("http://event-bus-srv/events", {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status
      }
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comments service is listening on port: 4001");
});
