var express = require('express');
var router = express.Router();
var interceptor=require('../../interceptor');
/* GET home page. */
router.get('/',
    interceptor(function(res,req,next,data){
        console.log(data); // { headers: { 'x-powered-by': 'Express' }, status: 200, body: 'hello world' }
        this.setBody('rewrite it'); // rewrite response in middleware.
    })
    ,function(req,res){
        res.send('hello world');
    })
;

module.exports = router;
