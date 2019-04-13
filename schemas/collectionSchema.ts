import { Schema } from "mongoose";
import cardSchema from "./cardSchema";

const collectionSchema : Schema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    owner: String,
    game: String,
    name: String,
    cards: [cardSchema]
})

export default collectionSchema;