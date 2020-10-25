const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const cor = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const pub = require('./route/public');
const ip = require('./route/getIp');
const cart = require('./route/cart');
const admin = require('./route/admin');
const mobile = require('./route/mobile')




//initializations
app.use(fileupload());
app.use(express.json());
app.use(express.static(__dirname +'/views'));
app.set('view engine', 'ejs');
app.use("/assets",express.static('assets'));

app.use(session({secret:'secret',saveUninitialized: true,resave:true}));
app.use(cookieParser('secret'));
app.use(flash());
app.use(cor());



app.use('/',pub);
app.use('/api/ip',ip);
app.use('/api/cart',cart);
app.use('/api/admin',admin);
app.use('/api/mobile',mobile);


app.listen(5000, ()=>{
    console.log('listening to port 5000');
});