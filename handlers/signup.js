const bcrypt = require("bcrypt");
const {db} = require("../database");
const {saltRounds} = require("../secretValues");

const post = (req, res) => {
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
}

module.exports = {
  post: post
}
