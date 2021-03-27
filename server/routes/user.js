const express = require('express')


const { read, publicProfile, update, photo } = require('../controllers/userController');
const { requireSignIn, auth } = require('../controllers/authController')




const router = express.Router()

router.get('/user/profile', requireSignIn, auth, read);
router.get('/user/:username', publicProfile);
router.put('/user/update', requireSignIn, auth, update);
router.get('/user/photo/:username', photo);

module.exports = router