const joi = require("joi")
const APIError =require("../../utils/errors")


class authValidation {
    constructor() {}
    static register = async (req,res,next)=>{
        try{


            await joi.object({
                name : joi.string().trim().min(3).max(100).required().messages({
                    "string.base":"İSİM ALANI NORMAL METİN OLMALIDIR",
                    "string.empty" :"İSİM ALANI BOŞ BIRAKILAMAZ",
                    "string.min" : "İSİM ALANI EN AZ 3 KARAKTERDEN OLUŞMALIDIR",
                    "string.max": "İSİM ALANI EN FAZLA 100 KARAKTERDEN OLUŞMALIDIR",
                    "string.required":"İSİM ALANINI GİRMEK ZORUNLUDUR"
                }),
                lastname : joi.string().trim().min(3).max(100).required().messages({
                    "string.base":"SOYİSİM ALANI NORMAL METİN OLMALIDIR",
                    "string.empty" :"SOYİSİM ALANI BOŞ BIRAKILAMAZ",
                    "string.min" : "SOYİSİM ALANI EN AZ 3 KARAKTERDEN OLUŞMALIDIR",
                    "string.max": "SOYİSİM ALANI EN FAZLA 100 KARAKTERDEN OLUŞMALIDIR",
                    "string.required":"SOYİSİM ALANINI GİRMEK ZORUNLUDUR"
                }),
                email : joi.string().email().trim().min(3).max(100).required().messages({//TODO: bu kısımdakı email gerçekçi bir email olup olmadığını kontrol eder
                    "string.base":"EMAİL ALANI NORMAL METİN OLMALIDIR",
                    "string.empty" :"EMAİL ALANI BOŞ BIRAKILAMAZ",
                    "string.min" : "EMAİL ALANI EN AZ 3 KARAKTERDEN OLUŞMALIDIR",
                    "string.email" : "LÜTFEN GEÇERLİ BİR EMAİL GİRİNİZ",
                    "string.max": "EMAİL ALANI EN FAZLA 100 KARAKTERDEN OLUŞMALIDIR",
                    "string.required":"EMAİL ALANINI GİRMEK ZORUNLUDUR"
                }),
                password : joi.string().trim().min(6).max(36).required().messages({
                    "string.base":"ŞİFRE ALANI NORMAL METİN OLMALIDIR",
                    "string.empty" :"ŞİFRE ALANI BOŞ BIRAKILAMAZ",
                    "string.min" : "ŞİFRE ALANI EN AZ 6 KARAKTERDEN OLUŞMALIDIR",
                    "string.max": "ŞİFRE ALANI EN FAZLA 36 KARAKTERDEN OLUŞMALIDIR",
                    "string.required":"ŞİFRE ALANINI GİRMEK ZORUNLUDUR"
                })
                
            }).validateAsync(req.body)
             //TODO: boddyden gelen kısımlar burada var mı dıye kontrol edip istenilemn tipte olup olmadığının kontrolününü gerçekleştirir
        }
        catch(error){
            if(error.detail && error?.detail[0].message)
                throw new APIError(error.detail[0].message,400)
            else throw new APIError("LÜTFEN VALİDASYON KURALLARINA UYUN",400)
        }
        next()
         //TODO: ara yazılım olduğu için devam etmesi için yaptık
    }




    static login = async (req,res,next)=>{
        try{
            await joi.object({
                email : joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base":"EMAİL ALANI NORMAL METİN OLMALIDIR",
                    "string.empty" :"EMAİL ALANI BOŞ BIRAKILAMAZ",
                    "string.min" : "EMAİL ALANI EN AZ 3 KARAKTERDEN OLUŞMALIDIR",
                    "string.email" : "LÜTFEN GEÇERLİ BİR EMAİL GİRİNİZ",
                    "string.max": "EMAİL ALANI EN FAZLA 100 KARAKTERDEN OLUŞMALIDIR",
                    "string.required":"EMAİL ALANINI GİRMEK ZORUNLUDUR"
                }),
                password : joi.string().trim().min(6).max(36).required().messages({
                    "string.base":"ŞİFRE ALANI NORMAL METİN OLMALIDIR",
                    "string.empty" :"ŞİFRE ALANI BOŞ BIRAKILAMAZ",
                    "string.min" : "ŞİFRE ALANI EN AZ 6 KARAKTERDEN OLUŞMALIDIR",
                    "string.max": "ŞİFRE ALANI EN FAZLA 36 KARAKTERDEN OLUŞMALIDIR",
                    "string.required":"ŞİFRE ALANINI GİRMEK ZORUNLUDUR"
                })
            }).validateAsync(req.body)
        }
        
        catch(error){
            if(error.detail && error?.detail[0].message)
                throw new APIError(error.detail[0].message,400)
            else throw new APIError("LÜTFEN VALİDASYON KURALLARINA UYUN",400)
        }
        next();
    }
}
module.exports = authValidation