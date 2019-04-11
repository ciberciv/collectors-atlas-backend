const bcrypt = require("bcrypt");
const {getUserFromRequest} = require("../identityManagement");
const {db} = require("../database");

const deleteUser = (req, res) => {
  const username = getUserFromRequest(req);
  const password = req.body.password;

  if (!password) {
    return res.status(400).json("Please fill in your password");
  }

  db.select("email").from("users").where("username", "=", username)
    .then(fetchedEmail => {
      return db.select("email", "password").from("login").where("email", "=", fetchedEmail[0].email)
    })
    .then(dbEntry => {
      const fetchedEmail = dbEntry[0].email;
      const fetchedPassword = dbEntry[0].password;

      bcrypt.compare(password, fetchedPassword).then(isMatch => {
        console.log(2);
        if (isMatch) {
          return db.transaction(trx => {
            trx.from("users").where("email", "=", fetchedEmail).del()
              .then(data => {
                return trx.from("login").where("email", "=", fetchedEmail).del();
              }).then(trx.commit).catch(trx.rollback)
          }).catch(err => res.status(400).json("Something went wrong"));
        } else {
          return res.status(403).json("Wrong password");
        }
      }).catch(err => res.status(400).json("Whoops"))
    })
    .then(res.status(200).json("Deleted"))
}

module.exports = {
  deleteUser: deleteUser
}