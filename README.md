res-interceptor
==================

Get response in middleware with Express.

##Installation

```
npm install res-interceptor
```

##Usage

```
var interceptor=require('res-interceptor');
```

```
router.get('/',
    interceptor(function(res,req,next,data){
        console.log(data); // { headers: { 'x-powered-by': 'Express' }, status: 200, body: 'hello world' }
        this.setBody('rewrite it'); // rewrite response in middleware.
    })
    ,function(req,res){
        res.send('hello world');
    })
;
```

##Warning

Do not use `res.send()` in middleware! 