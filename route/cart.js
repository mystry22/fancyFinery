const express = require('express');
const app = express();
const router = express.Router()
const {sumCartItems,insertIntoCart,getCartItems,checkExistingCartProd,getSubTotal,deleteCartItem} = require('../model/db_helpers');
const reqIp = require('request-ip');




router.get('/cartSum',async(req,res)=>{

    const ip = reqIp.getClientIp(req);

    let count = await sumCartItems(ip).then(result =>{
        

        res.status(200).json(result);
       
    });
});

router.post('/addToCart',async(req,res)=>{

    const price = parseInt(req.body.curr_price);
    const Qqty = parseInt(req.body.qty)
    const subTotal = price*Qqty;
    const prod_id = req.body.prod_id;

    const data ={
        prod_id :req.body.prod_id,
        ip : req.body.ip,
        prod_name : req.body.prod_name,
        image_name : req.body.image_name,
        curr_price: req.body.curr_price,
        size: req.body.size,
        qty: req.body.qty,
        subtotal: subTotal

    };

    await checkExistingCartProd(prod_id).then(result =>{
        if(result.length > 0){
            res.status(200).json('exist');
        }else{
            insertIntoCart(data);
            res.status(200).json('ok');
        }
    })

 
});

router.get('/cartItems',(req,res)=>{
    const ip = reqIp.getClientIp(req);
    getCartItems(ip).then(result =>{
        res.status(200).json(result);
    });

});

router.get('/getTotalSum',async(req,res)=>{
    const ip = reqIp.getClientIp(req);
    await getSubTotal(ip).then(result =>{
        res.json(result);
    });

});

router.post('/deleteCartItem', async(req,res)=>{
    let data ={
        prod_id : req.body.prod_id
    };
   let isDeleted =  await deleteCartItem(data);

   if(isDeleted){
       res.json('cart item deleted');
   }else{
       res.json('product not deleted');
   }
       
    
});





module.exports = router;