const router =require('express').Router()
const multer = require('multer')
const upload = require('../middlewares/lib/upload.js')
const APIError = require("../utils/errors")
//yetkilendirme için auth 
const Response = require("../utils/response")

const auth  = require("./auth.routers.js")



router.use(auth)



//genel yonettıgımız seyler burada oldugu ıcın bır upload yapacagımız ıcın bu da genek bır ıslemdır

router.post("/upload",function(req,res){
    upload(req,res, function(err){
        if(err instanceof multer.MulterError)
            throw new APIError("Resim yüklenirken multer kaynaklı hata çıktı: ",err)

        else if(err)
            throw new APIError("Resim yüklenirken hata çıktı: ",err)

        else
            return new Response(req.savedImages, "Yükleme Başarılı").success(res)
   
    })
})



module.exports = router