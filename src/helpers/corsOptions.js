//beyaz lıste yanı ızın verılen apı lıstelerı:

const whiteList = ["http://localhost:3000"]

const corsOptions = (req, callback) => {
    let corsOptions;

    if(whiteList.indexOf(req.header.("Origin")) !== -1){ //-1 array içinde mevcut degıl demek oluyor yanı soyle dusun -1 dıye bır ındex yok  
        corsOptions = {origin :true}
    }
    else{
        corsOptions = {origin : false}
    }
    callback(null, corsOptions)
}

module.exports = corsOptions