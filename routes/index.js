const express = require('express')
const router = express.Router()

// authentication
router.use('/token', require('./auth'))

// user
router.use('/user', require('./user'))

module.exports = router
