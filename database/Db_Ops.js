var url = require('./config');
const client = require('mongodb').MongoClient;

const insertProduct = function(obj) {client.connect(url, {useNewUrlParser: true , useUnifiedTopology: true},(err,db)=>{
    if(err){
        console.log('erro');
    }else{
        console.log('connected');
        var dbo = db.db('becadb');
        
        dbo.collection('products').insertOne(obj, (err,res)=>{
         if(err){
             console.log('err');
         }else{
             
             db.close();
         }
        });
          
    }
});   

}

async function populateProducts(){
        var mydb = await client.connect(url,{useNewUrlParser: true , useUnifiedTopology: true});
       if(!mydb){
           console.log('connection error');
       }
       try{
        var dbo = mydb.db('becadb');
        var collect  = dbo.collection('products');
        var result = collect.find({}).toArray();
            if(!result){
                console.log('result error');
            }else{
                return result;
            }
       }catch(error){
           console.log(error);
       }

   
  
};

async function checkProd(queryVar){
    
   /* var mydb = await client.connect(url,{useNewUrlParser: true , useUnifiedTopology: true});
    if(!mydb){
        console.log('connection error');
    }
    try{
     var dbo = mydb.db('becadb');
     var collect  = dbo.collection('products');
     var result = collect.find({}).toArray();
         if(!result){
             console.log('result error');
         }else{
             return result;
         }
    }catch(error){
        console.log(error);
    }
    */
   return queryVar;


   
  
};

async function userAuth(userData){
    var mydb = await client.connect(url,{useNewUrlParser: true , useUnifiedTopology: true});
    if(!mydb){
        console.log('connection error');
    }
    try{
     var dbo = mydb.db('becadb');
     var collect  = dbo.collection('users');
     var result = collect.findOne(userData); 
         if(!result){
             console.log('result error');
         }else{
             return result;
         }
    }catch(error){
        console.log(error);
    }
}


const createUser = function(obj) {client.connect(url, {useNewUrlParser: true , useUnifiedTopology: true},(err,db)=>{
    if(err){
        console.log('erro');
    }else{
        console.log('connected');
        var dbo = db.db('becadb');
        
        dbo.collection('users').insertOne(obj, (err,res)=>{
         if(err){
             console.log('err');
         }else{
             
             db.close();
         }
        });
          
    }
});   

}



    
module.exports = {insertProduct,
                   populateProducts,
                   checkProd,
                   userAuth,
                   createUser
                };