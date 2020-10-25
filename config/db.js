const mongoose = require('mongoose');
const dbUrl = 'mongodb://127.0.0.1/becadb';
mongoose.connect(dbUrl, {useUnifiedTopology:true, useNewUrlParser:true},()=>{
    console.log('db connection working');
});