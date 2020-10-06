"use strict";

var express = require("express");

var cors = require("cors");

var bodyParser = require("body-parser");

var _require = require("crypto"),
    randomBytes = _require.randomBytes;

var axios = require("axios");

var app = express();
app.use(cors());
app.use(bodyParser.json()); //As this is a project simply for demo purposes, data will simply be stored in memory

var posts = {};
app.get("/posts", function (req, res) {
  res.send(posts);
});
app.post("/posts", function _callee(req, res) {
  var id, title;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = randomBytes(4).toString("hex");
          title = req.body.title;
          posts[id] = {
            id: id,
            title: title
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(axios.post("http://event-bus-srv:4005/events", {
            type: "PostCreated",
            data: {
              id: id,
              title: title
            }
          }));

        case 5:
          res.status(201).send(posts[id]);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/events", function (req, res) {
  console.log({
    event: req.body.type
  });
  res.send({});
});
app.listen(4000, function () {
  console.log("This course has been great!");
  console.log("post service is listening on port: 4000");
});