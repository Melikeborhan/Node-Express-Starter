require("express-async-errors")
const express = require("express")
const  app = express()
require("dotenv").config()//porta erişim sağlandı
require("./src/db/dbConnection.js")
const port = process.env.PORT || 5001 
const router = require("./src/routers")
const errorHandlerMiddleware = require("./src/middlewares/errorHandler.js")
const cors = require('cors')





//MIDDLEWARE : GELEN BODY I OKUMAMIZI SAGLAYACAK
//bunu en basa yazmamız gerekli!!!
app.use(express.json())//gonderılen isteklerin body dekı json formatına donusturup okuyabılırız
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true,parameterLimit:50000}))





app.use("/api",router)


// app.get("/",(req,res) =>{
//     res.json({
//         message:"hoş geldiniz"
//     })
// })

//hata yakalama

app.use(errorHandlerMiddleware)

app.listen(port,()=>{
    console.log(`server ${port} calışıyor...`);
})