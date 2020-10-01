const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");
const { log } = require("console");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//As this is a project simply for demo purposes, data will simply be stored in memory
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title }
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log({ event: req.body.type });
  res.send({});
});

app.listen(4000, () => {
  console.log("This course has been great!");
  console.log("post service is listening on port: 4000");
});
