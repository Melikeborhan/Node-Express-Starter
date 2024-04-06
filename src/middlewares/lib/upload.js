const multer = require("multer")
const path = require("path")
const fs = require("fs")


const fileFilter = (req,file,callback)=>{
    const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"]

    if (!allowedMimeTypes.includes(file.mimetype)){
        callback(new Error("BU RESİM TİPİ DESTEKLENMEMKTEDİR LÜTFEN GECERLİ BİR TİP SEÇİNİZ",false))

    }
        callback(null,true)
  
}
 
const storage = multer.diskStorage({
    destination :  function(req,file,callback){
        const rootDir = path.dirname(require.main.filename)//nereye yukleyeceksek dosya konumunu belırtıyoruz projemızın bulundugu konumu bulur 
        console.log("requre.main.filename: ",require.main.filename);

        //KLASORU OLUSTURMA KLASOR VARSA BURAYA ATSIN YOKSA DA BUNU OLUSTURSUN
        fs.mkdirSync(path.join(rootDir, "/public/uploads"), { recursive: true })//dosyayı olusturacak var mı yok mu bakar yoksa olusturur 
        
        //burada ıcıne atar bır publıc acıp ıcıne uploads ısımlı bır klasor acacaktır.

        callback(null, path.join(rootDir, "/public/uploads"))

    },
    filename: function(req,file,callback){
        const extension = file.mimetype.split("/")[1] // bu kısımda yukarıda gostermıs oldugumuz images/jpg gıbı turlerı / olarak ayırıyoruz ve 1. ındexı aldıgımızda turunu almıs oluyoruz.
    
        //resım yuklemesı yapıyorsam bunların ıcıne eklenerek gıtsın
        if(!req.savedImages) req.savedImages = []

        //RESIM YUKLERKEN URL OLUSTURMA VE ALMA

        //uniq ID olusturmak ıcın multer doc alındı 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        let url  = `image_${uniqueSuffix}.${extension}`
    

        req.savedImages = [...req.savedImages, path.join(url)] //TODO:BASINA ... KOYDUGUMUZDA ARRAY DE PARCALAMA YAPILABILIR yanı üç nokta yerıne 3 eleman gelebılır 


        callback(null,url)
    }
})
//DIŞARI AÇMA

const upload = multer({storage,fileFilter}).array("images")//array dedıgımızde bırden cok resım yuklemesı yapılabılır fakat sıngle dersek ancak  tek  resım kabul eder

module.exports = upload