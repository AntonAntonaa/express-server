const express = require("express");
const routes = require('./router');
const { body, param, validationResult } = require("express-validator");

const jsonParser = express.json();
const app = express();

app.use(jsonParser);
app.use(express.urlencoded());

app.use(routes)

app.get("/health", (req, res) => {
  return res.json({ OK: "da" });
});


app.listen(3002, () => {
  console.log("Application listening on port 3002!");
});
