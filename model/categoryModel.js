const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cat_name : {
        type: String,
        min: 2,
        max: 125,
        required : true
    },

    cat_id : {
        type: String,
        min: 3,
        max: 125,
        required: true
    }
});

module.exports = mongoose.model('Category',categorySchema);