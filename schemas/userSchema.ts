import { Schema, Document } from "mongoose";

const userSchema : Schema= new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    joined: {
        type: Date,
        timestamps: true
    },
    collection_ids: [{collection_id: Number}]
})

export default userSchema;