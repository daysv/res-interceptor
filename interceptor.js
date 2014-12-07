var newData;
function Interceptor(cb){
    this.setBody=function(data){
        newData =data;
    };
    return function(req,res,next){
        if(typeof cb !=='function') return next();
        if(arguments.length!==3) return next();
        if(typeof req!=='object' || typeof res!=='object' ||typeof  next !== 'function') return next();
        newData='';
        var responseObj = {
            headers:res._headers
        };
        res.realSend=res.send;
        res.send=function(statusOrBody,body){
            if(arguments.length===2){
                responseObj.status=statusOrBody;
                responseObj.body=body;
            }else{
                responseObj.status=res.statusCode;
                responseObj.body=statusOrBody;
            }
            cb(res,req,next,responseObj);
            if(newData===null || newData===''|| typeof newData==='undefined'){
                return res.realSend(responseObj.body);
            }
            else{
                return res.realSend(newData);
            }
        };
        next();
    }
}

module.exports=Interceptor;

