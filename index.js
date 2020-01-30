const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./api");

import { DBCommon } from "./db/user";

const app = express();
const PORT = 80;
const API_PREFIX = "/v1";

DBCommon.init();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(API_PREFIX, apiRouter);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  }
  console.log(`server start at port ${PORT}`);
});
