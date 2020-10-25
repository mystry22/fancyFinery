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

  cat_name: {
    type: String,
    required: true
},
display_home : {
    type: String
},
variation_name1 : {
    type: String
},
variation_name2 : {
    type: String
},
variation_name3 : {
    type: String
},
image_name1 : {
    type: String
},
image_name2 : {
    type: String
},
image_name3 : {
    type: String
}
});

module.exports = mongoose.model('Prod',prodSchema);