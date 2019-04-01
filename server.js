const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
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
const jwtKey = "secret";

const app = express();

const jwtCheck = expressjwt({secret: jwtKey}).unless({path: [
  "/register",
  "/signup",
  "/login",
  "/signin",
  "/helloworld"]});

app.use(bodyParser.json());
app.use(cors());
app.use(jwtCheck);

app.get("/helloworld", (req, res) => {
  res.send("Hello World");
});

app.post("/signin", (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json("Fill all the data");
  }

  db.select("email").from("users").where("username", "=", username)
    .then(fetchedEmail => {
      return db.select("email", "password").from("login").where("email", "=", fetchedEmail[0].email)
    })
    .then(dbEntry => {
      bcrypt.compare(password, dbEntry[0].password).then(isMatch => {
        if (isMatch) {
          jwt.sign({email: dbEntry[0].email}, jwtKey, (err, token) => {
            if (err) {
              return res.status(400).json("Error on generating session");
            } else {
              return res.status(200).json(token);
            }
          })
        } else {
          return  res.status(403).json("Wrong credentials");
        }
      }).catch(err => res.status(400).json("Something went wrong"))
    }).catch(err => res.status(403).json("Wrong credentials"));
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
