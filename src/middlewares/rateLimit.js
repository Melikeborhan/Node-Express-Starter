const rateLimit = require('express-rate-limit')


const allowList = ["::1"] //local


//kullanıcıyı engelleme sureesı
const apiLimiter = rateLimit({
    windowMs:15 * 60 * 1000, //15 dk bekleme suresı 

    max: (req,res) =>{
        console.log("api url: ", req.url);
        console.log("api ip: ", req.ip);


        if(req.url === "/login" || req.url === "/register" ) return 5  //5 kere deneme hakkı verır

        else return 100 //100 kere deneme hakkı 
    },

    message: {
        success : false,
        message : "ÇOK FAZLA İSTEKTE BULUNDUNUZ !"
    },
    
    skip: (req,res)=> allowList.includes(req.ip), //belırlı ıp lere ızın verme 
    
    standartHeaders: true,//sunucunun gelen istekleri daha iyi anlamasına yardımcı olur.
    legacyHeaders : false//Bu seçenek ise, eski bir versiyonun ayarlarını kullanmak isteyip istemediğinizi belirtir. 


})

module.exports = apiLimiter