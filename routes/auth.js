const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')()

router.post('/', AuthController.token.bind(AuthController))

module.exports = router
