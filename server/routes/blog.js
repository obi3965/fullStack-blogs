const express = require('express')
const { requireSignIn, admin } = require('../controllers/authController')


const router = express.Router()

const { create } = require('../controllers/blogController')
const { isRequestValidated } = require('../validation/validate')


router.post('/create/blog',isRequestValidated, requireSignIn, admin, create)




module.exports = router