var newData;
var newHeader;
function Interceptor(cb){
    this.body=function(data){
        newData =data;
    };

    this.set=function zzz(field, val){
        if(arguments.length===2){
            newHeader=JSON.parse('{"'+field.toString()+'":"'+val.toString()+'"}');
        }else if(arguments.length===1){
            if(typeof field!=='object') return;
            newHeader=field;
        }
    };

    return function(req,res,next){
        if(typeof cb !=='function') return next();
        if(arguments.length!==3) return next();
        if(typeof req!=='object' || typeof res!=='object' ||typeof  next !== 'function') return next();
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

            cb(req,res,next,responseObj);

            if(typeof newHeader !== 'undefined')
                res.set(newHeader);

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
