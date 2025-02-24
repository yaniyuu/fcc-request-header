// index.js
// where your node app starts

// Init project
var express = require("express");
var app = express();

// Enable CORS so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // Some legacy browsers choke on 204

// Serve static files
app.use(express.static("public"));

// Basic routing
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Timestamp Microservice endpoint
app.get("/api/:date?", function (req, res) {
  let { date } = req.params;

  if (!date) {
    let now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  if (/^\d+$/.test(date)) {
    date = parseInt(date);
  }

  let parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: parsedDate.getTime(), utc: parsedDate.toUTCString() });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
