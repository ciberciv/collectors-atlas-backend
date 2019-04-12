const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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

module.exports = {
    userSchema: userSchema
}