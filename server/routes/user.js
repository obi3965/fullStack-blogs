const express = require('express')


const {signup} = require('../controllers/userController')
const { validateSignUp, isRequestValidated } = require('../validation/validate')



const router = express.Router()

router.post('/signup',validateSignUp, isRequestValidated, signup)

module.exports = router