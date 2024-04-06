require("express-async-errors")
const express = require("express")
const  app = express()
require("dotenv").config()//porta erişim sağlandı
require("./src/db/dbConnection.js")
const port = process.env.PORT || 5001 
const router = require("./src/routers")
const errorHandlerMiddleware = require("./src/middlewares/errorHandler.js")
const cors = require('cors')
const corsOptions = require("./src/helpers/corsOptions.js")
const mongoSanitize = require('express-mongo-sanitize');
const path  = require("path")
const apiLimiter = require("./src/middlewares/rateLimit.js")


//MIDDLEWARE : GELEN BODY I OKUMAMIZI SAGLAYACAK
//bunu en basa yazmamız gerekli!!!
app.use(express.json())//gonderılen isteklerin body dekı json formatına donusturup okuyabılırız
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true,parameterLimit:50000}))



//YUKLENEN RESIMLERI TARAYICIDA ACMAYI SAGLAMAK
app.use(express.static(path.join(__dirname, "public")))
app.use("/uploads",express.static(__dirname))



app.use(cors(corsOptions))


app.use("/api", apiLimiter)

// Or, to replace these prohibited characters with _, use:
app.use(
    mongoSanitize({
      replaceWith: '_',
    }),
  );




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