const router =require('express').Router()

//yetkilendirme için auth 
const auth  = require("./auth.routers.js")

router.use(auth)

module.exports = router