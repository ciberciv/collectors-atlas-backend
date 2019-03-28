const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json("Fill all the data");
  }

  db.select("email", "password").from("login").where("email", "=", email)
    .then(dbEntry => {
      bcrypt.compare(password, dbEntry[0].password).then(isMatch => {
        if (isMatch) {
          jwt.sign({email:dbEntry[0].email}, "secret", (err, token) => {
            if (err) {
              return res.status(400).json("Error on generating session");
            } else {
              return res.status(200).json(token);
            }
          })
        } else {
          return  res.status(400).json("Wrong credentials");
        }
      }).catch(err => res.status(400).json("Something went wrong"))
    }).catch(err => res.status(400).json("Wrong credentials"));
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
          return trx.insert({
              email: registeredEmail[0],
              username: username,
              joined: new Date()
            })
              .into("users")
              .returning("*")
              .then(user => {
                res.json(user[0]);
              })
        }).then(trx.commit).catch(trx.rollback)
    }).catch(err => res.status(400).json("Something went wrong"))
  }).catch(err => res.status(400).json("Please, try again"));
})

app.listen(3000);
