const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
  first_name: {
      type: String,
      required: true,
      min: 3,
      max: 125
  },
  last_name: {
      type: String,
      required: true,
      min: 2,
      max: 1005
  },
  phone : {
      type: Number,
      required: true
  },
  email: {
      type: String,
      required: true
  },
    address: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    }
    
    

});

module.exports = mongoose.model('Users',prodSchema);