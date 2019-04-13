import { Schema } from "mongoose";

const cardSchema : Schema = new Schema({
    card_id: Number,
    set: String,
    rarity: String,
    condition: String,
    quantity: Number,
    language: String
})

export default cardSchema;