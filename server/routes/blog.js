const express = require('express')
const { requireSignIn, admin } = require('../controllers/authController')


const router = express.Router()

const { create, list, read, remove, all, photo } = require('../controllers/blogController')

const { isRequestValidated } = require('../validation/validate')


router.post('/create/blog',isRequestValidated, requireSignIn, admin, create)
router.get('/blogs', list)
router.get('/blog/:slug', read);
router.delete('/blog/:slug',isRequestValidated, requireSignIn, admin,remove )
router.get('/blogs/all', all)
router.get('/blogs/photo/:slug', photo)
module.exports = router