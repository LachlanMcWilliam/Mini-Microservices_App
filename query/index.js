const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { commentId, content, postId } = data;

    const post = posts[postId];
    console.log({ commentId, content });
    post.comments.push({ commentId, content });
  }

  res.send({ status: "ok" });
});

app.listen(4002, () => {
  console.log("query listening on port: 4002");
});
