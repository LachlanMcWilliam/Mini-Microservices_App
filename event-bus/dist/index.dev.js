"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var axios = require("axios");

var app = express();
app.use(bodyParser.json());
var events = [];
app.post("/events", function (req, res) {
  var event = req.body;
  events.push(event);
  axios.post("http://posts-clusterip-srv:4000/events", event); // axios.post("http://localhost:4001/events", event);
  // axios.post("http://localhost:4002/events", event);
  // axios.post("http://localhost:4003/events", event);

  res.send({
    status: "OK"
  });
});
app.get("/events", function (req, res) {
  res.send(events);
});
app.listen(4005, function () {
  console.log("event bus listening on port: 4005");
});