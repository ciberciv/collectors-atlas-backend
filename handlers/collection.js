const {getUser} = require("../identityManagement");
const {db} = require("../database");

const put = (req, res) => {
  const {game, name} = req.body;
  const token = req.headers.authorization.slice(7);
  const owner = getUser(token);

  if (!owner) {
    return res.status(400).json("Something went wrong user");
  }

  return db.transaction(trx => {
    trx.insert({
      game: game,
      owner: owner,
      name: name,
      card_ids: []
    })
      .into("collections")
      .returning("id")
      .then(id => {
        if (!id) {
          return res.status(400).json("Something went wrong")
        } else {
          return db.select("collection_ids").from("users").where("username", "=", owner)
            .then(fetchedCollections => {
              let collections = fetchedCollections[0].collection_ids;

              collections.push(id[0]);

              return collections;
            })
            .then(updatedCollections => {
              return trx("users").where("username", "=", owner).update({
                collection_ids: updatedCollections
              }).returning("collection_ids")
            })
            .then(trx.commit).catch(trx.callback)
        }
      })
      .then(data => res.status(200).json("Cool")).catch(err => res.status(400).json("Something went wrong"))
    })
}

module.exports = {
  put: put
}
