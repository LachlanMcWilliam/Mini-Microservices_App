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

var commentsByPostId = {};
app.get("/posts/:id/comments", function (req, res) {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", function _callee(req, res) {
  var id, content, postId, comments;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = randomBytes(4).toString("hex");
          content = req.body.content;
          postId = req.params.id;
          comments = commentsByPostId[postId] || [];
          comments.push({
            id: id,
            content: content,
            status: "pending"
          });
          commentsByPostId[postId] = comments;
          _context.next = 8;
          return regeneratorRuntime.awrap(axios.post("http://event-bus-srv/events", {
            type: "CommentCreated",
            data: {
              id: id,
              postId: postId,
              content: content,
              status: "pending"
            }
          }));

        case 8:
          res.status(201).send(comments);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/events", function _callee2(req, res) {
  var _req$body, type, data, id, postId, status, content, comments, comment;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log({
            event: req.body.type
          });
          _req$body = req.body, type = _req$body.type, data = _req$body.data;

          if (!(type === "CommentModerated")) {
            _context2.next = 9;
            break;
          }

          id = data.id, postId = data.postId, status = data.status, content = data.content;
          comments = commentsByPostId[postId];
          comment = comments.find(function (comment) {
            return comment.id == id;
          });
          comment.status = status;
          _context2.next = 9;
          return regeneratorRuntime.awrap(axios.post("http://event-bus-srv/events", {
            type: "CommentUpdated",
            data: {
              id: id,
              postId: postId,
              content: content,
              status: status
            }
          }));

        case 9:
          res.send({});

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(4001, function () {
  console.log("Comments service is listening on port: 4001");
});