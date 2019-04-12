const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    card_id: Number,
    set: String,
    rarity: String,
    condition: String,
    quantity: Number,
    language: String
})

module.exports = {
    cardSchema: cardSchema
}