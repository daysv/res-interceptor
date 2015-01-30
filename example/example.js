var express = require('express');
var interceptor=require('../lib/interceptor');
var app = express();

app.use(
    interceptor (function (req,res,next,data) {
        console.log(data); // { headers: { 'x-powered-by': 'Express', id: '1' }, status: 200, body: 'hello world' }
        this.set('id','2'); // overwrite response headers in middleware.
        // or
        this.set({
            foo:'bar'
        });
        this.body('Goodbye'); // overwrite response body in middleware.
    })
);

app.get('/', function (req, res) {
    res.set('id','1');
    res.send('hello world');
});

app.listen(3000);