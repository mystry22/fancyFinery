const express = require('express');
const app = express();
const router = express.Router();
const reqIp = require('request-ip');


router.get('/getclientsIp',(req,res)=>{
    let ip =  reqIp.getClientIp(req);
    res.status(200).json(ip);
  });

  module.exports = router;