const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post("/posts", (req, res) => {});

app.post("/events", (req, res) => {});

app.listen(4002, () => {
  console.log("query listening on port: 4002");
});
