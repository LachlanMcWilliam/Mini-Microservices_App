const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;

    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id == id;
    });

    comment.content = content;
    comment.status = status;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({ status: "ok" });
});

app.listen(4002, async () => {
  console.log("query listening on port: 4002");

  const res = await axios.get("http://event-bus-srv:4005/events");

  for (let event of res.data) {
    console.log("processing event:", event.type);
    handleEvent(event.type, event.data);
  }
});
