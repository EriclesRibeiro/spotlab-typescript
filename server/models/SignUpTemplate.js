const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    hashCode: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('users', signUpTemplate);