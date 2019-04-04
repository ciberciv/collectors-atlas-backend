const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const {jwtCheck} = require("./identityManagement");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(jwtCheck);

module.exports = {
  app: app
}
