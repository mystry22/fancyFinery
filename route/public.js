const express = require('express');
const app = express();
const router = express.Router();
const db_conn = require('../config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const reqIp = require('request-ip');
require('dotenv').config();
const nodemailer = require('nodemailer');





const {loadHomeProds,viewSingleProduct,createNewUser,checkExistingUser,loadCategory,loginUser,
  getCartItems,loadAllProds,insertOrder,viewMultipleProduct,clearCart,updateOrder,deliveryFee,
  findAllOrders,orderCodeDet} = 
  require('../model/db_helpers');





const orderRandom = ()=>{
  const orderHeader = 'ffr';
  const min = 900000
  const max = 999999
  const order_number = Math.floor(Math.random() * max) +min;
  const orderCode = orderHeader.concat(order_number);
  return orderCode;
}
//for product sessioning
const checkProduct = function(req,res,next){
    try{
        const token = req.cookies.view_product;
         jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
          if (err) {
            //do something
            req.flash('msg','Kindly Ensure A  Product Was Selected');
            res.redirect('/');
          } else {
            req.userProd = decodedToken
            next();
          }
        });
      }catch(err){
       // req.flash('msg', 'No product Found');   
        res.redirect('/');
        console.log(err)
        
      }
}

const checkUser = function(req,res,next){
  try{
    const token = req.headers.authorization;
    const bearerSplit = token.split(' ');
    const authToken = bearerSplit[1];
    jwt.verify(authToken,process.env.TOKEN_SECRET,(err,decodedToken) =>{
      if(err){ 
        res.status(200).json('unauthorised');
      }else{
        req.myUser = decodedToken;
        next();
      }
    });
  }
  catch(err){
    console.log(err);
  }
}

const doUpdate = async(req,res,next)=>{
 
}

const cartSum = async function(req,res,){
  let ip = reqIp.getClientIp(req);
  let count = await sumCartItems(ip);
  const countPayload = {cartSum : count}
  const countToken = jwt.sign(countPayload,process.env.COUNT_TOKEN);
  res.cookie('countToken',countToken);
 
};

const getCartSumItems = function(req,res,next){
  try{
    const token = req.cookies.countToken;
     jwt.verify(token, process.env.COUNT_TOKEN, (err, decodedToken) => {
      if (err) {
        //do something
        req.flash('msg','Kindly Ensure A  Product Was Selected');
        res.redirect('/');
      } else {
        req.count = decodedToken
        next();
      }
    });
  }catch(err){
    req.flash('msg', 'No product Found');   
    res.redirect('/');
    console.log(err)
    
  }
}



 



router.get('/', (req,res)=>{
    
      loadHomeProds().then((result)=>{
        
        
        let prod = result;
        var tittle = 'FancyFiner | Home';
        var msg = req.flash('msg');
        
        if(userId){
           res.render('index',{tittle,userId,prod,msg});
               }else{
            var userId = '';
            res.render('index',{tittle,userId,prod,msg}); 
               }
        
      
       });
   });


   router.post('/viewprod',(req,res)=>{
   
    const prod_id = req.body.prod_id;
    const productPayload = {prod_id : prod_id};
    const prodToken = jwt.sign(productPayload,process.env.TOKEN_SECRET,{expiresIn : 1800});
    res.cookie('view_product', prodToken);
    res.send(prodToken);

    });

// current working routes
    router.get('/getDetails',checkUser,(req,res)=>{
      let user = req.myUser;
      checkExistingUser(user).then(result=>{
        res.status(200).json(result);
        console.log(result);
      });
    });


    router.post('/login',async(req,res)=>{
      const password = req.body.pass;
      const username = req.body.user;
      const data ={
        username : username
      };
      const user = await loginUser(data);
      if(!user){
        res.status(200).json('unauthorised');
      }else{
          const isPass = await bycrypt.compare(password,user.password);
          if(!isPass){
            res.status(200).json('unauthorised');
          }else{
            const payload = {username: username}
            const token = jwt.sign(payload,process.env.TOKEN_SECRET);
            res.status(200).json(token);
          }
      }
    });

    //registration router
    router.post('/register', async(req,res)=>{

      const salt = await bycrypt.genSalt(10);
      const hashPassword = await bycrypt.hash(req.body.password,salt);
      
      const data ={
        first_name: req.body.fname,
        last_name: req.body.lname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        username: req.body.username,
        password: hashPassword
      };
    
      const user = req.body.username;
   
     await checkExistingUser(user).then(
        result =>{
          if(result.length > 0){
            res.status(200).json('user exist');

          }else{
            createNewUser(data);
            const payload = {username: user}
            const token = jwt.sign(payload,process.env.TOKEN_SECRET);
            res.status(200).json(token);
          }
          
        }
      )

      
    });

    router.get('/api/mydata', (req,res)=>{

    loadHomeProds()
    .then((response) =>{
      let data = response;
      res.status(200).json(data);
      
    });
    
    });

    router.get('/loadAllProducts', async(req,res)=>{
      loadAllProds().then(result =>{
        res.status(200).json(result);
      
      });
    });

    router.get('/getProduct/:id',(req,res)=>{
      const id = req.params.id;
      
      const vari = id.substr(3)

      
      const data = {prod_id : vari };
      viewSingleProduct(data).then((result) =>{
       
       res.status(200).json(result);
      }); 
    });

    router.get('/getViaCategory/:id',(req,res)=>{
      const id = req.params.id;
      
      const vari = id.substr(3)

      
      const data = {cat_name : vari };
      viewMultipleProduct(data).then(result =>{
       res.status(200).json(result);
      }); 
    });

    router.get('/category',(req,res)=>{
      loadCategory().then(result =>{
        res.status(200).json(result);
      });
    });

    router.get('/userDetails',checkUser, async(req,res)=>{
      let myuser = req.myUser;
      let user = myuser.username;
      let data = {
        username: user
      }
      
      let  isTrue = await loginUser(data);
      if(isTrue){
      res.status(200).json(isTrue);
      }else{
        res.status(200).json('no user found');
      }

    });

    router.post('/completeOrder', (req,res)=>{
      let fullname = req.body.name;
      let address = req.body.address;
      let phone = req.body.phone;
      let city = req.body.city;
      let state = req.body.state;
      let deliveryCost = req.body.deliveryCost;
      let user = req.body.user;
      const orderCode = orderRandom();
      const ip = reqIp.getClientIp(req);
      getCartItems(ip).then(result =>{
        let data = '';
        
        result.forEach(doInsert);
        function doInsert (entry){
          data = {
            prod_name : entry.prod_name,
            prod_id : entry.prod_id,
            image_name : entry.image_name,
            curr_price : entry.curr_price,
            qty : entry.qty,
            subtotal : entry.subtotal,
            order_code: orderCode,
            order_date : Date.now(),
            size: entry.size,
            status: 'None',
            ip: entry.ip,
            name: fullname,
            address: address,
            city: city,
            state : state,
            deliveryCost: deliveryCost,
            phone: phone,
            user: user

          };
          
          insertOrder(data);
        }
      
        
        res.json('ok');
      
       
    });
      

    });


    router.post('/mailMe',(req,res)=>{

      let fullname = req.body.fullname;
      let email = req.body.email;
      let subject = req.body.subject;
      let message = req.body.message;

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.user,
          pass: process.env.pass
        }
      });
      let to = 'alanemehenry6@gmail.com';
      let mailOptions ={
        from : email,
        to: to,
        subject: subject,
        text: `Hi my name is ${fullname} with email address ${email}\n ${message}`
      }

      transporter.sendMail(mailOptions, (err,data)=>{
        if(err){
          res.json('Sorry we are unable to complete this request at the moment');
        }else{
          res.json('sent');
        }
      });
    });

  router.post('/afterPayment', async(req,res)=>{
  const pending = 'pending';
  const ip = req.body.ip;
  const email = req.body.email;
  const update = {
    status: pending
  }
  const deleteMany = {
    ip : ip
  }
      const clearCartForIp = clearCart(deleteMany);
      if(clearCartForIp){
        updateOrder(update,ip);
       await notifier(req);
       
          res.status(200).json('ok');
     
      }else{
        res.status(200).json('Unable to clear cart');
      }

    });

    const notifier = async (req)=>{
      const status = '';
      let email = req.body.email;
        
      
        let subject = 'New Order';
        
  
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.user,
            pass: process.env.pass
          }
        });
        let to = 'alanemehenry6@gmail.com';
        let mailOptions ={
          from : email,
          to: to,
          subject: subject,
          text: `Dear team,\n kindly login and attend to a new order from ${email}`
        }
  
        transporter.sendMail(mailOptions, (err,data)=>{
          if(err){
            console.log(err)
          }else{
            console.log('sent');
          }
        });
  
    }

    router.get('/getVariation/:id',(req,res)=>{
      const id = req.params.id;
      
      const vari = id.substr(3)

      
      const data = {variation_name1 : vari };
      viewSingleProduct(data).then((result) =>{
         if(result){
           const data ={
             prod_id : result.prod_id,
             prod_name : result.prod_name,
             description : result.description,
             curr_price: result.curr_price,
             image_name : result.image_name1,
             variation_name1 : result.variation_name1,
             variation_name2 : result.variation_name2,
             variation_name3 : result.variation_name3
           }
          res.status(200).json(data);
         }else{
          const data = {variation_name2 : vari };
          viewSingleProduct(data).then(result =>{
            if(result){
              const data ={
                prod_id : result.prod_id,
                prod_name : result.prod_name,
                description : result.description,
                curr_price: result.curr_price,
                image_name : result.image_name2,
                variation_name1 : result.variation_name1,
                variation_name2 : result.variation_name2,
                variation_name3 : result.variation_name3
              }
             res.status(200).json(data);
            }else{
              const data = {variation_name3 : vari };
              viewSingleProduct(data).then(result =>{
                if(result){
                  const data ={
                    prod_id : result.prod_id,
                    prod_name : result.prod_name,
                    description : result.description,
                    curr_price: result.curr_price,
                    image_name : result.image_name3,
                    variation_name1 : result.variation_name1,
                    variation_name2 : result.variation_name2,
                    variation_name3 : result.variation_name3
                  }
                 res.status(200).json(data);
                }else{

                }
              })
            }

          });
         }
       
      }); 
    });
    
    router.get('/deliveryFee',checkUser,async(req,res)=>{

      let myUser = req.myUser;
      let newUser = myUser.username;
      const user = {user: newUser}
      
      deliveryFee(user).then(result =>{
        
        res.json(result);
      });

    });

    router.get('/getRefOrder',checkUser,async(req,res)=>{
            let myUser = req.myUser;
      let newUser = myUser.username;
      const user = {user: newUser}
      
      findAllOrders(user).then(result =>{
        
        res.json(result);
      });

    });
    
    router.post('/ordDetails', async(req,res)=>{
      const ordCode = req.body.ordCode;
      orderCodeDet(ordCode).then(result =>{
        res.json(result);
      });
    });

  
    module.exports = router;