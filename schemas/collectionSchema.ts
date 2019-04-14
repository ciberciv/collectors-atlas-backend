import { Schema } from "mongoose";
import cardSchema from "./cardSchema";

const collectionSchema : Schema = new Schema({
    owner: String,
    game: String,
    name: String,
    cards: [cardSchema]
})

export default collectionSchema;