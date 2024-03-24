const user = require("../models/user.model")
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");


const login =async (req,res) =>{
    return res.json(req.body);
}

const register =async (req,res) =>{
    //return res.json(req.body);
    const { email } = req.body  //bunu su dekılde de yapabılırız req.body.email

    const userCheck =  await user.findOne({email})
    //({email:email}) bunu bı sekılde kullanmada kolaylık saglar aynı ısımdeyse karsılıklı yazmana gerek yok der. veya ({email: req.body.email}) bu sekılde de kullanımları vardır

    if(userCheck) {
        throw new APIError("GİRİLEN EMAİL KULLANIMDA!",401)
       // console.log("GİRİLEN EMAİL KULLANIMDA!");
    }
    //KULLANICI SIFRESINI HASHLEMEK BCRPT PAKETI ILE OLUR

    req.body.password = await bcrypt.hash(req.body.password,10)

    console.log("hash şifre:",req.body.password);



    // try{
        const userSave = new user(req.body)

        await userSave.save()// verıtabanına kayıt
            .then((data)=>{
                return new Response(data, "KAYIT BAŞARIYLA EKLENDİ!").created(res)


                // return res.status(201).json({
                //     succes:true,
                //     data: response,
                //     message:"KAYIT BAŞARIYLA EKLENDİ!"
                // })
            })
            .catch((err)=>{
                throw new APIError("malesef kullanıcı kayıt edilemedi",400)
                //console.log(err);
            })


    // }
     //.catch(error){
    //     console.log(error);
   // }

}

module.exports = {
    login,
    register
}