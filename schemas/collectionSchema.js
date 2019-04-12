const mongoose = require("mongoose");
const {cardSchema} = require("./cardSchema");

const collectionSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    owner: String,
    game: String,
    name: String,
    cards: [cardSchema]
})

module.exports = {
    collectionSchema: collectionSchema
}