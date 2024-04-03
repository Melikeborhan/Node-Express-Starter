const router =require('express').Router()
const APIError = require("../utils/errors")
const Joi = require('joi')
//yetkilendirme için auth 

const auth  = require("./auth.routers.js")

router.use(auth)

module.exports = router