import { Schema } from "mongoose";

const loginSchema : Schema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
})

export default loginSchema;