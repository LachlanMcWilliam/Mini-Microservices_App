const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const PORT = 4003;
const app = express();

app.use(bodyParser.json());

//Routes Here
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }

  res.send({});
});

app.listen(PORT, () => console.log("listening on port: " + PORT));
