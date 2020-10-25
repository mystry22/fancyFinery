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
  old_price: {
      type: String,
      required: true,
      
  },
  curr_price : {
      type: String,
      required: true
  },
  description : {
      type: String,
      required: true
  },
  prod_id: {
      type: String,
      required: true
  },
  cat_id : {
      type: String,
      required : true
  }
});

module.exports = mongoose.model('Prod',prodSchema);