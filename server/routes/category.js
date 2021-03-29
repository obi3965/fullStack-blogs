const express = require('express')
const { requireSignIn, admin } = require('../controllers/authController')

const { create, list, read, remove} = require('../controllers/categoryController')
const { isRequestValidated } = require('../validation/validate')


const router = express.Router()


router.post('/create/category', isRequestValidated, requireSignIn, admin, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.delete('/category/:slug', isRequestValidated, requireSignIn, admin, remove)

module.exports = router