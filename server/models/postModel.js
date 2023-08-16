const mongoose = require('mongoose');
const { userDetailsSchema, UserDetail } = require('./userModel')

const Schema = mongoose.Schema

const postSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    location: String,
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    liked_by: Array,
    user: userDetailsSchema,
})

module.exports = mongoose.model('Post', postSchema)