const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String
})

module.exports = {
    loginSchema: loginSchema
}