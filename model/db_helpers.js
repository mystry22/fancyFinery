const mongoose = require('mongoose');
const Prod = require('./Prod');
const Cat = require('./categoryModel');
const AdminUsers = require('./Adminusers');
const Cart = require('./Cart');
const User = require('./User');
const Orders = require('./Orders');


const insert = async function(data){
    const newProd = new Prod(data);
    const res = await newProd.save();

   };

const insertCategory = async function(data){
    const newCat = new Cat(data);
    await newCat.save();
};  

const deleteCategory = async function(data){
    const deleteOne = await Cat.deleteOne(data);
    return true;
}

const loadProds = async function(){
    const getProd = await Prod.find({});
    return getProd;
    
}

const loadCategory = async function(){
    const loadCat = await Cat.find({});
    return loadCat;
}

const loginAdmin = async function(data){
 const adminLogin = await AdminUsers.findOne(data);
 return adminLogin;

}

const registerNewAdmin = async function(data){
    const newAdmin = new AdminUsers(data);
    const res = await newAdmin.save();
}

const viewSingleProduct = async function(data){
    const prod = await Prod.findOne(data);
    return prod;

}

const viewMultipleProduct = async function(data){
    const prod = await Prod.find(data);
    return prod;

}

const viewDisplayStatus = async function(id){
    const prod = await Prod.find(id,{'display_home' : 1});
    return prod;
}

const updateProduct = async function(data,id){
    
    const update = await Prod.updateOne({prod_id : id}, {$set : {status: data}});
    

}


const deleteProduct = async function(data){
 const deleteOne = await Prod.deleteOne(data);
}

const loadHomeProds = async function(){
    const getProd = await Prod.find({display_home : 'yes'});
    return getProd;
    
}

const insertIntoCart = async function(data){
    const cart = new Cart(data);
    const resp = await cart.save();
}

const sumCartItems = async function(myip){
    
    const cart = await Cart.find({ip: myip}).countDocuments();
    return cart;
}

const getCartItems = async function(ip){
    const cartItems = await Cart.find({ip : ip});
    return cartItems;
}

const getSubTotal = async function(ip){
    const subTotal = await Cart.aggregate(
        [
            {$match: {}},
            {$group  : {_id: "$ip",subtotal :{$sum : "$subtotal"}}}
        ]
    );
    return subTotal;
}

const createNewUser = async function(data){
    const newUser = new User(data);
    const res = await newUser.save();

   };
const checkExistingUser = async function(user){
    const userExist = await User.find({username: user});
    return userExist;
}

const checkExistingCartProd = async function(prod_id){
    const prodExist = await Cart.find({prod_id: prod_id});
    return prodExist;
}

const loginUser = async function(data){
    const userLogin = await User.findOne(data);
    return userLogin;
   
   }

const loadAllProds = async function(){
    const getProd = await Prod.find();
    return getProd;
    
}

const deleteCartItem = async function(data){
    const deleteOne = await Cart.deleteOne(data);
    return true;
   }
const insertOrder = async function(data){
    const order = new Orders(data);
    const resp = await order.save(); 
}


const pendingOrderCount = async function(data){
    
    const order = await Orders.find(data).countDocuments();
    return order;
}

const workingOrderCount = async function(data){
    
    const order = await Orders.find(data).countDocuments();
    return order;
}

const deliveredOrderCount = async function(data){
    
    const order = await Orders.find(data).countDocuments();
    return order;
}

const pendingOrdersCount = async function(data){
    const order = await Orders.find(data).countDocuments();
    return order;
}

const allPendingOrder = async function(data){
    const order = await Orders.find(data);
    return order;
}

const allWorkingOrder = async function(data){
    const order = await Orders.find(data);
    return order;
}

const allDeliveredOrder = async function(data){
    const order = await Orders.find(data);
    return order;
}

const forNoneOrders = async function(data){
    const order = await Orders.find(data);
    return order;
}

const updateTrack = async function(track,id){
    
    const update = await Orders.updateOne({prod_id : id}, {$set : {status : track}});
    

}

const clearCart = async function(data){
    const deleteOne = await Cart.deleteMany(data);
    return true;
   }

const updateOrder = async function(items,id){
    
const update = await Orders.updateMany({ip : id}, {$set : items});
    

}

const getUniquePrintDetails = async function(order_code){
    const unique = await Orders.findOne(order_code);
    return unique;
}

const getUniqueAllPrintDetails = async function(ref,filter){
    const unique = await Orders.find({$and:[{"order_code":ref},{"status":filter}]});
    return unique;
}

const sumSubtotal = async function(ref,filter){
    const subTotal = await Orders.aggregate(
        [
            {$match: {$and:[{"order_code": ref},{'status':filter}]}},
            {$group  : {_id: "$order_code",subtotal :{$sum : "$subtotal"}}}
        ]
    );
    return subTotal;
}

const checkVariation1 = async function(id){
    const result = await Prod.findOne(id,{variation_name1:1});
    return result;
}

const checkVariation2 = async function(id){
    const result = await Prod.findOne(id,{variation_name2:1});
    return result;
}

const checkVariation3 = async function(id){
    const result = await Prod.findOne(id,{variation_name3:1});
    return result;
}

const updateVariation = async function(id,data){
    const update = await Prod.updateOne(id, {$set : data});
}

const deliveryFee = async function(user){
    const result = await Orders.findOne(user,{deliveryCost:1});
    return result;
}

const findAllOrders = async function(user){
    const result = await Orders.find(user);
    return result;
}

const orderCodeDet = async function(code){
    const result = await Orders.find({order_code : code});
    return result;
}



   module.exports.loadProds = loadProds;
   module.exports.insertCategory = insertCategory;
   module.exports.insert = insert;
   module.exports.loadCategory = loadCategory;
   module.exports.loginAdmin = loginAdmin;
   module.exports.registerNewAdmin = registerNewAdmin;
   module.exports.viewSingleProduct = viewSingleProduct;
   module.exports.updateProduct = updateProduct;
   module.exports.deleteProduct = deleteProduct;
   module.exports.loadHomeProds = loadHomeProds;
   module.exports.viewDisplayStatus = viewDisplayStatus;
   module.exports.insertIntoCart = insertIntoCart;
   module.exports.sumCartItems = sumCartItems;
   module.exports.getCartItems = getCartItems;
   module.exports.getSubTotal = getSubTotal;
   module.exports.createNewUser = createNewUser;
   module.exports.checkExistingUser = checkExistingUser;
   module.exports.checkExistingCartProd = checkExistingCartProd;
   module.exports.loginUser = loginUser;
   module.exports.loadAllProds = loadAllProds;
   module.exports.deleteCartItem = deleteCartItem;
   module.exports.insertOrder = insertOrder;
   module.exports.deleteCategory = deleteCategory;
   module.exports.viewMultipleProduct = viewMultipleProduct;
   module.exports.pendingOrderCount = pendingOrderCount;
   module.exports.workingOrderCount = workingOrderCount;
   module.exports.deliveredOrderCount = deliveredOrderCount;
   module.exports.pendingOrdersCount = pendingOrdersCount;
   module.exports.allPendingOrder = allPendingOrder;
   module.exports.allWorkingOrder = allWorkingOrder;
   module.exports.allDeliveredOrder = allDeliveredOrder;
   module.exports.updateTrack = updateTrack;
   module.exports.clearCart = clearCart;
   module.exports.updateOrder = updateOrder;
   module.exports.forNoneOrders = forNoneOrders;
   module.exports.getUniquePrintDetails = getUniquePrintDetails;
   module.exports.getUniqueAllPrintDetails = getUniqueAllPrintDetails;
   module.exports.sumSubtotal = sumSubtotal;
   module.exports.checkVariation1 = checkVariation1;
   module.exports.checkVariation2 = checkVariation2;
   module.exports.checkVariation3 = checkVariation3;
   module.exports.updateVariation = updateVariation;
   module.exports.deliveryFee = deliveryFee;
   module.exports.findAllOrders = findAllOrders;
   module.exports.orderCodeDet = orderCodeDet;



   
   