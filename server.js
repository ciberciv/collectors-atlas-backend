const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const dbcredentials = require("./dbcredentials");

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : dbcredentials.user,
    password : dbcredentials.password,
    database : 'col-atlas'
  }
});

const app = express();

app.use(bodyParser.json());
// app.use(cors);

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.post("/signin", (req, res) => {

})

app.post("/signup", (req, res) => {
  const {username, email, password, passwordRep} = req.body;

  if (!username || !email || !password || !passwordRep) {
    return res.status(400).json("Here");
  }

  return db.insert({name: username, password: password, id: 1}).into("users")
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json(err));
})

app.listen(3000);
