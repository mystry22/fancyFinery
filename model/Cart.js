const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
  prod_name: {
      type: String,
      required: true,
      min: 3,
      max: 125
  },
  image_name: {
      type: String,
      required: true,
      min: 2,
      max: 1005
  },
  curr_price : {
      type: Number,
      required: true
  },
  prod_id: {
      type: String,
      required: true
  },
    size: {
        type: String
    },
    qty: {
        type: String
    },
    ip : {
        type: String,
        required: true

    },
    subtotal : {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Cart',prodSchema);