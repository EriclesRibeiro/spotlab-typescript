const mongoose = require('mongoose');

const Project = mongoose.model('projects', {
    name: {
        type: String
    },
    owner: {
        type: String
    },
    description: {
        type: String
    },
    private: {
        type: Boolean
    },
    members: {
        type: Array
    },
    created_at: {
        type: String
    },
    identifier: {
        type: String
    },
    updated_at: {
        type: String
    },
    categorie: {
        type: String
    },
    repositorie: {
        type: String
    }
});

module.exports = Project;