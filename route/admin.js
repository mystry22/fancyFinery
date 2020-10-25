const express = require('express');
const session  = require('express-session');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const bycrypt = require('bcryptjs');
const app = express();
const flash = require('connect-flash');
const {insert,insertCategory,loadCategory,loginAdmin,registerNewAdmin,loadProds,viewSingleProduct,updateProduct,
  deleteProduct,deleteCategory,pendingOrderCount,workingOrderCount,deliveredOrderCount,pendingOrdersCount,
  allPendingOrder,allWorkingOrder,allDeliveredOrder,updateTrack,forNoneOrders,getUniquePrintDetails,getUniqueAllPrintDetails,
  sumSubtotal,checkVariation1,checkVariation2,checkVariation3,updateVariation} = require('../model/db_helpers');
const jwt = require('jsonwebtoken');
const { cookie } = require('express-validator');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
require('dotenv').config();
const nodemailer = require('nodemailer');



//initialisations
app.use(fileupload());
app.use("/assets",express.static('assets'));
app.use(session({secret:'mysecret',saveUninitialized: true,resave:true}));
app.use(flash());
app.use(express.json());
app.use(cookieParser());

//var dbUrl = 'mongodb://127.0.0.1/becadb';
//mongoose.connect(dbUrl, {useUnifiedTopology:true, useNewUrlParser:true},()=>{
  //  console.log('db connection working');
//});

//setup image storage
/*
var storage = multer.diskStorage({
    destination: './frontend/public/image/',
    filename: function(req, file, cb){
        cb(null,file.originalname);
    }
});

var upload =  multer({
    storage: storage,
    limits: {fieldSize: 1000000},
    fileFilter: function(req,file,cb){
        checkFileType(file,cb);
    }
    }).single('prodImg');

function checkFileType(file, cb){
   //allowed types
   const allowedFileTypes = /jpg|jpeg|gif|png/;
   //check if the file type is of file 

   const extention = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
   const mimetype = allowedFileTypes.test(file.mimetype);
   if(extention && mimetype){
    return cb(null,true);
    }else{
        console.log('bia common put image here');
    }

   if(extention){
       return cb(null,true);
   }else{
       console.log('bia common put image here');
   }

}

*/

app.use(express.static(__dirname +'/views'));

const checkSingleProd = function(req,res,next){

  try{
    const token = req.cookies.single_product;
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        //do something
        req.flash('msg','Kindly Ensure A  Product Was Selected');
        res.redirect('/editProduct');
      } else {
        req.prodToken = decodedToken
        next();
      }
    });
  
    
  }catch(err){
    req.flash('msg', 'No Product found');   
    res.redirect('/editProduct');
    console.log(err)
    
  }

}

const checkLogin = function(req,res,next){

  try{
    const token = req.headers.authorization;
    const splitToken = token.split(' ');
    const actualToken = splitToken[1];
    jwt.verify(actualToken, process.env.TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.json('invalid credentials');
      } else {
        req.user = decodedToken
        next();
      }
    });
  
    
  }catch(err){
    req.flash('msg', 'User not Verified');   
    res.redirect('/adminLogin');
    console.log(err)
    
  }

}


router.get('/addProduct',checkLogin,(req,res)=>{
  loadCategory().then((result)=>{
    const cat = result;
  
    var msg = req.flash();
    var tittle = 'Admin | Add Product';
    var userId = req.user;
    

    res.render('admin/addproduct',{tittle,cat,userId,msg});
  })
    

});



router.get('/addCategory',checkLogin,(req,res)=>{

  loadCategory().then((result)=>{
    let cat = result;
    var msg = req.flash();
    var tittle = 'Admin | Add Category';
    var userId = req.user;

    res.render('admin/addcategory',{tittle,cat,userId,msg});
  })
    

});



router.get('/adminLogin',(req,res)=>{
  var msg = req.flash();
    var tittle = 'Admin | Add Product';
    var userId = '';

    res.render('admin/adminlogin',{tittle,userId,msg});
});





router.post('/createNewAdmin',async(req,res)=>{
  const username = req.body.user;
  const mname = req.body.name;

  const salt = await bycrypt.genSalt(10);
  const hashPassword = await bycrypt.hash(req.body.pass,salt);
  
        const data = {
          user : username,
          pass : hashPassword,
          name : mname
        };
        const resp = registerNewAdmin(data);
        if(!resp){
          req.flash('msg', 'New Admin was not registered' );
          res.redirect('/addNewAdmin');
        }else{
          req.flash('msg', 'New Admin registered' );
          res.redirect('/addNewAdmin');
        }
      

});

router.get('/editProduct', checkLogin, (req,res)=>{

  loadProds().then((result)=>{
  const msg = req.flash();
  const tittle = 'Admin | Edit Product';
  const userId = req.user;
  const prod = result;


  res.render('admin/editproduct',{tittle,userId,prod,msg});
  });
});

router.post('/viewSingleEdit',(req,res)=>{
  const prod_id = req.body.prod_id;
  const productPayload = {prod_id : prod_id};
  const prodToken = jwt.sign(productPayload,process.env.TOKEN_SECRET);
  res.cookie('single_product', prodToken);
  res.redirect('/myProductUpdate');
  


});


//working admin route


router.post('/updateProd', (req,res)=>{

  let id = req.body.prod_id;


  let items = {
    prod_name : req.body.prod_name,
    old_price : req.body.old_price,
    curr_price : req.body.curr_price,
    description : req.body.description,
    cat_name : req.body.cat_name,
    display_home: req.body.display_home
  }
  

  const updated =  updateProduct(items,id);

    res.status(200).json('update done');



});

router.post('/updateProdWithImage', async (req,res)=>{
  let id = req.body.prod_id;
  let file = req.files.image;

  try{
  
  await file.mv(`./frontend/public/image/${file.name}`,err=>{

    if(err){
      res.status(200).json('Error moving file');
    }else{
      let items = {
        prod_name : req.body.prod_name,
        old_price : req.body.old_price,
        curr_price : req.body.curr_price,
        description : req.body.description,
        cat_name : req.body.cat_name,
        image_name : req.files.image.name,
        display_home: req.body.display_home
      };
       updateProduct(items,id);
       res.json('update done');
     
    }
  });



}catch(error){
  console.log(error);
}
  
 
 
});

router.post('/deleteProduct', (req,res)=>{
  const prod_id = req.body.prod_id;
  const data = {prod_id : prod_id};
  const deleted = deleteProduct(data);
  if(deleted){
    res.json('deleted');
  }
});

router.post('/login', async(req,res)=>{
  const pass = req.body.pass;
  const userValue = req.body.user;
  
  const data = {
    user : userValue
  };
  const user = await loginAdmin(data);
  if(!user){
    res.status(200).json('Invalid username or password');
  }else{
    const validPass = await bycrypt.compare(pass,user.pass);
    if(!validPass){
      res.status(200).json('Invalid username or password');
    }else{
      const payload = {adminuser : userValue};
      const token =  jwt.sign(payload,process.env.TOKEN_SECRET);
      res.status(200).json(token);
    }
  }
  
  
 

});

router.post('/loadAdminDetails',checkLogin,async (req,res)=>{
  let myuser = req.user;
  let user = myuser.adminuser;
  let data = {
    user : user
  }

  let  isTrue = await loginAdmin(data);
  if(isTrue){
    res.status(200).json(isTrue);
  }
  
});

router.post('/addCategory',(req,res)=>{
  
 
  var min = 1000
  var max = 9000
  const catId =  Math.random() * (max - min) + min;

  const data = {
    cat_name : req.body.prod_cat,
    cat_id : catId
  };
  try{
  const saved = insertCategory(data);
    if(saved){
      res.status(200).json('new category added');
    }else{
      res.status(200).json('error adding new category');
    }
  }catch(err){
    console.log(err);
  }

 



});

router.post('/deleteCategory',(req,res)=>{
const prod_cat = req.body.prod_cat;
const data = {
  cat_name : prod_cat
}

 const isDelete = deleteCategory(data);
 if(isDelete){
   res.status(200).json('category deleted successfuly');
 }else{
  res.status(200).json('category not deleted ');
 }


});

router.post('/insertProduct', async (req,res)=>{
  let min = 1000000
  let max = 9000000
  const rand =  Math.random() * (max - min) + min;


 try{
          const file = req.files.image;
          const allowedFileTypes = /jpg|jpeg|gif|png/;
        

        const extention = allowedFileTypes.test(path.extname(file.name).toLowerCase());
        if(extention){
           await file.mv(`./frontend/public/image/${file.name}`,err=>{
              if(err){
                res.status(200).json('error uploading file');
              }else{
                const data = {
                  prod_name: req.body.prod_name,
                  image_name: file.name,
                  old_price : req.body.old_price,
                  curr_price: req.body.curr_price,
                  description: req.body.desc,
                  prod_id : rand,
                  cat_name : req.body.cat_name
                };


                const saved = insert(data);
                res.status(200).json('done');
              }
            });
            
        }else{
          res.status(200).json('Please enter a valid image');
        }
      }catch(error){
        console.log(error);
      }
 
  
 
});

router.get('/pendingOrders',(req,res)=>{
  const data = {
    status: 'pending'
  }
  pendingOrderCount(data).then(result =>{
    res.json(result);
  });
});

router.get('/workingOrders',(req,res)=>{
  const data = {
    status: 'working'
  }
  workingOrderCount(data).then(result =>{
    res.json(result);
  });
});

router.get('/deliveredOrders',(req,res)=>{
  const data = {
    status: 'delivered'
  }
  deliveredOrderCount(data).then(result =>{
    res.json(result);
  });
});

router.get('/allOrders',(req,res)=>{
  const data = {
    status: 'None'
  }
  pendingOrdersCount(data).then(result =>{
    res.json(result);
  });
});

router.get('/pendingDetails',(req,res)=>{
  const data ={
    status : 'pending'
  }

  allPendingOrder(data).then(result =>{
    res.json(result);
  });
});

router.get('/workingDetails',(req,res)=>{
  const data ={
    status : 'working'
  }

  allWorkingOrder(data).then(result =>{
    res.json(result);
  });
});

router.get('/deliveredDetails',(req,res)=>{
  const data ={
    status : 'delivered'
  }

  allDeliveredOrder(data).then(result =>{
    res.json(result);
  });
});

router.get('/allNoneOrder',(req,res)=>{
  const data ={
    status : 'None'
  }

  forNoneOrders(data).then(result =>{
    res.json(result);
  });
});

router.post('/updateTrack',(req,res)=>{

  const id = req.body.prod_id;
  const data = req.body.status;
  

  updateTrack(data,id);
  res.status(200).json('done'); 
});

router.post('/uniquePersonalDetails',(req,res)=>{
  const ref = req.body.order_code;

  const order_code = {
    order_code : ref
  }

  getUniquePrintDetails(order_code).then(result =>{
    res.json(result);
  });

});

router.post('/totalOrder',(req,res)=>{
  const ref = req.body.ref;
  const filter = req.body.filter;

  getUniqueAllPrintDetails(ref,filter).then(result =>{
    res.json(result);
  });
});

router.post('/grandTotal', async(req,res)=>{
  const ref = req.body.ref;
  const filter = req.body.filter;
 await sumSubtotal(ref,filter).then(result =>{
    res.json(result);
  });
});

router.post('/variation', (req,res)=>{
  const id = {prod_id: req.body.prod_id}
    checkVariation1(id).then(result =>{
      const vari = result.variation_name1
    if(vari){
      checkVariation2(id).then(result =>{
        const vari2 = result.variation_name2
        if(vari2){
          checkVariation3(id).then(result =>{
            const vari3 = result.variation_name3
            if(vari3){
            res.json('Maximum variation reached');
            }else{
              // if third variation is empty
              const file = req.files.image;
              file.mv(`./frontend/public/image/${file.name}`);
              const data ={
                variation_name3 : req.body.variation_name,
                image_name3 : req.files.image.name
              }
              updateVariation(id,data);
              res.json('done');
            }
          });
        }else{
          // if second variation is empty
          const file = req.files.image;
          file.mv(`./frontend/public/image/${file.name}`);
          const data ={
            variation_name2 : req.body.variation_name,
            image_name2 : req.files.image.name
          }
          updateVariation(id,data);
          res.json('done');
        }
      })
      
    }else{
      // if first variation is empty
      const file = req.files.image;
      file.mv(`./frontend/public/image/${file.name}`);
      const data ={
        variation_name1 : req.body.variation_name,
        image_name1 : req.files.image.name
      };

      updateVariation(id,data);
      res.json('done');
 
    }
  }) 
});











app.use('/', router);
module.exports = router;