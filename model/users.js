const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  user: {
      type: String,
      required: true,
      min: 3,
      max: 125
  },
  pass: {
      type: String,
      required: true,
      min: 2,
      max: 1005
  },
  name: {
    type: String,
    min: 3,
    required: true
  }
});

module.exports = mongoose.model('Adminusers',usersSchema);