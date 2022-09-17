const mongoose = require('mongoose');
const User = require("../models/user");

const { Schema } = mongoose;

const boardSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'user'
    },
    // title: {
    //     type: String,
    //     required: true
    // },
    body: {
        type: String,
        required: true
    },

    // imgPath: {
    //     type: String
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('board', boardSchema);