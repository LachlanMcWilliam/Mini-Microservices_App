"use strict";

var express = require("express");

var axios = require("axios");

var bodyParser = require("body-parser");

var PORT = 4003;
var app = express();
app.use(bodyParser.json()); //Routes Here

app.post("/events", function _callee(req, res) {
  var _req$body, type, data, status;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, type = _req$body.type, data = _req$body.data;

          if (!(type === "CommentCreated")) {
            _context.next = 5;
            break;
          }

          status = data.content.includes("orange") ? "rejected" : "approved";
          _context.next = 5;
          return regeneratorRuntime.awrap(axios.post("http://event-bus-srv:4005/events", {
            type: "CommentModerated",
            data: {
              id: data.id,
              postId: data.postId,
              status: status,
              content: data.content
            }
          }));

        case 5:
          res.send({});

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.listen(PORT, function () {
  return console.log("listening on port: " + PORT);
});