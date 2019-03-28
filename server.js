const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
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

const saltRounds = 10;

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
    return res.status(400).json("Fill all the data");
  }

  if (password != passwordRep) {
    return res.status(400).json("Password missmatch")
  }

  const hash = bcrypt.hash(password, saltRounds).then(hash => {
    db.transaction(trx => {
      trx.insert({
        email: email,
        password: hash
      })
        .into("login")
        .returning("email")
        .then(registeredEmail => {
          return trx("users")
            .returning("*")
            .insert({
              email: registeredEmail[0],
              username: username,
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            })
        }).then(trx.commit).catch(trx.rollback)
    }).catch(err => res.status(400).json("Something went wrong"))
  }).catch(err => res.status(400).json("Please, try again"));
})

app.listen(3000);
