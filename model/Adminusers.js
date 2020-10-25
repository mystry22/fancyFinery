const mongoose = require('mongoose');

const adminUsers = new mongoose.Schema({
    user : {
        type: String,
        min: 3,
        max: 1025,
        required: true
    },
    pass : {
        type: String,
        min: 3,
        max: 1025,
        required: true
    },
    name : {
        type: String,
        min: 3,
        max: 1025,
        required: true
    }

})

module.exports = mongoose.model('Adminusers',adminUsers);