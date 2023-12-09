const express = require("express");

const app = express();

const hostname = "localhost";
const post = 8017;

app.get("/", (req, res) => {
  res.send("helloworld");
});

app.listen(post, hostname, () => {
  console.log(`hello Duy, running sever at ${hostname}:${post}`);
});
