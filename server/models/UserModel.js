const mongoose = require('mongoose');

const User = mongoose.model('User', {
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    categories: {
        type: Array
    },
    role: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    }
});

module.exports = User;