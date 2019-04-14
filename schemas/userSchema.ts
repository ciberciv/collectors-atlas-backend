import { Schema, Document } from "mongoose";

const userSchema : Schema= new Schema({
    username: String,
    email: String,
    joined: Date
})

export default userSchema;