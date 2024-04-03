const APIError  = require("../utils/errors")

const errorHandlerMiddleware = (err,req,res,next)=>{
    //errorun APIError sınıfına ait olup oolmadığını kontrol etme
    if(err instanceof APIError){//instanceof bir objenın belırlı bır sınıfa ait olup olmadığını kontrol eden yapıdır.
        return res.status(err.statusCode || 400)
        .json({
            succes :false,
            message:err.message
        })
    }
    //api yı dınlerken hata varsa bu kısma dusmus olur boylece hata verırı

    console.log(err);

    
    return res.status(500).json({
        succes:false,
        message:"BİR HATA VAR LÜTFEN APİNİZİ KONTROL EDİNİZ!"
    })
}

module.exports =errorHandlerMiddleware