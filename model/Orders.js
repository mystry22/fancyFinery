const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    prod_name: {
        type: String,
        min: 3,
        max: 125
    },
    image_name: {
        type: String,
        min: 2,
        max: 1005
    },
    prod_id: {
        type: String,
        
    },
    size: {
        type: String,
        
    },
    qty: {
        type: String,
        
    },
    curr_price: {
        type: String,
       
    },
    ip: {
        type: String,
        
    },
    order_code: {
        type: String,
        
    },
    status: {
        type: String,
        
    },
    order_date: {
        type: Date,
    
    },
    phone: {
        type: String,
        
    },
    address: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    state: {
        type: String,
        
    },
    name: {
        type: String,
        
    },
    subtotal: {
        type: Number,
        
    },
    deliveryCost: {
        type: Number,
        
    },
    user: {
        type: String,
        
    },
    
    remark: {
        type: String,
        
    }
});

module.exports = mongoose.model('Orders',orderSchema);