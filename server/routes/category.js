const express = require('express')
const { requireSignIn, admin } = require('../controllers/authController')

const {create,list} = require('../controllers/categoryController')
const { categoryCreateValidator, isRequestValidated } = require('../validation/validate')


const router = express.Router()


router.post('/create/category', categoryCreateValidator, isRequestValidated, requireSignIn, admin, create)
router.get('/categories', list)

module.exports = router