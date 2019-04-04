const knex = require("knex");
const {dbUser, dbPassword} = require("./secretValues");

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : dbUser,
    password : dbPassword,
    database : 'col-atlas'
  }
});

module.exports = {
  db: db
}
