const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtKey} = require("../identityManagement");
const {db} = require("../database");

const signInUser = (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).json("Fill all the data");
  }

  db.select("email").from("users").where("username", "=", username)
    .then(fetchedEmail => {
      return db.select("password").from("login").where("email", "=", fetchedEmail[0].email)
    })
    .then(dbEntry => {
      const fetchedPassword = dbEntry[0].password;

      bcrypt.compare(password, fetchedPassword).then(isMatch => {
        if (isMatch) {
          jwt.sign({username: username}, jwtKey, (err, token) => {
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
}

module.exports = {
  signInUser: signInUser
}
