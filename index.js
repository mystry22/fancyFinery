const express = require('express');
const app = express();

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const pub = require('./route/public');
const ip = require('./route/getIp');
const cor = require('cors');



//initializations
app.use(express.static(__dirname +'/views'));
app.set('view engine', 'ejs');
app.use("/assets",express.static('assets'));

app.use(session({secret:'secret',saveUninitialized: true,resave:true}));
app.use(cookieParser('secret'));
app.use(flash());




app.use('/',pub);
app.use('/api/ip',ip);

app.use(cor());
app.listen(5000, ()=>{
    console.log('listening to port 5000');
});