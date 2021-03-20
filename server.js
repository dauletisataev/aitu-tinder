const express = require("express");
const path = require("path");
const app = express();
const portNumber = process.env.PORT || 3000;
const sourceDir = "dist";

app.use(express.static(path.join(__dirname, sourceDir)));

app.get("/check-status", (req, res) => res.send("OK bratab don't warry"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, sourceDir, "index.html"));
});

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});
