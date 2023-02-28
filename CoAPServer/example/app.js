const Router = require("../lib/router");
// const express = require("express");
const app = Router();
const client = require("./connection/connection");
require("dotenv").config();

client.connect((err) => {
  if (err) {
    app.use(errorHandler());
  } else {
    console.log("Connected Database CoAP");
  }
});

app.help = `Usage:
GET / - Display this help document.
GET /thermometer - Get the current temperature together with humidity.
GET /thermometer observe - Immediately get the above information when changed.
GET /thermometer/temperature - Get the current temperature only.
GET /thermometer/humidity - Get the current humidity only.
GET /thermometer/:foo/:bar - Test route parameters.`;

app.get("/", (req, res) => {
  res.end(app.help);
});

app.use("/thermometer", require("./routes/thermometer"));
app.use("/db", require("./routes/db"));

module.exports = app;
