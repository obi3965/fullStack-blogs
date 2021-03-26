const express = require('express')


const {signup, signin, signout} = require('../controllers/userController')
const { validateSignUp, valdateSignIn, isRequestValidated } = require('../validation/validate')



const router = express.Router()

router.post('/signup',validateSignUp, isRequestValidated, signup)
router.post('/signin', valdateSignIn, isRequestValidated, signin)
router.get('/signout', signout);


module.exports = router