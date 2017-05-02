const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')()
const UserController = require('../controllers/UserController')()

router.get('/', AuthController.middlewareAuth, UserController.dataUserLogged.bind(UserController))

module.exports = router
