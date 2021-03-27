const express = require('express')
const { requireSignIn, admin } = require('../controllers/authController')

const {create} = require('../controllers/categoryController')


const router = express.Router()


router.post('/create/category',requireSignIn, admin, create)


module.exports = router