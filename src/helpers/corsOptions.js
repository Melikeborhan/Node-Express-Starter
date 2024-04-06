//beyaz lıste yanı ızın verılen apı lıstelerı:

const whiteList = ["http://localhost:3000"]

const corsOptions = (req, callback) => {
    let corsOptions;
    console.log("Origin");

    if(whiteList.indexOf(req.header("Origin")) !== -1){ //-1 array içinde mevcut degıl demek oluyor yanı soyle dusun -1 dıye bır ındex yok  
        console.log("if içerisinde");
        
        corsOptions = {origin :true}
    }
    else{
        console.log("else içerisinde");
        corsOptions = {origin : false}
    }
    callback(null, corsOptions)
}

module.exports = corsOptions