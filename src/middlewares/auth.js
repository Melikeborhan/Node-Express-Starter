const { response } = require('express')
const jwt  = require('jsonwebtoken')
const user = require('../models/user.model')
const APIError = require('../utils/errors')

const createToken = async (user,res)=>{
    console.log(user);


    //TODO: token olusturma olustururken bızden bır tasımak ıcın payload yanı yuk bekler

    const  payload = {
        sub: user._id,
        name:user.name


    }

    const token = await jwt.sign(payload,process.env.JWT_SECRET_KEY,{
        algorithm : "HS512",   //güçlü şifreleme yapmak için 
        expiresIn: process.env.JWT_EXPIRES_IN //token suresı 
    })

    return res.status(201).json({
        success : true,
        token,
        message: " BAŞARILI"
    });
}
//TOKEN KONTROL

const tokenCheck = async(req, res , next) =>{
    const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ")

    if(!headerToken)
        throw new APIError("GECERSİZ OTURUM LUTFEN OTURUM ACIN",401)

        //token cozumleme 

    const token = req.headers.authorization.split(" ")[1]  //tokenı almıs olduk

        //console.log(token);

//yukarıda jwt.sing sıfrelemıs oldugumuz tokenı cozuyoruz
        await jwt.verify(token,process.env.JWT_SECRET_KEY, async(err, decoded) => {
            if(err)
             throw new APIError("gecersiz token",401)

                const userInfo = await user.findById(decoded.sub).select("_id name lastname email ")

                //console.log(userInfo);

                if(!userInfo)
                    throw new APIError("GECERSİZ TOKEN",401)

                req.user = userInfo 
                next();
        })
    }

module.exports = {
    createToken,
    tokenCheck

}