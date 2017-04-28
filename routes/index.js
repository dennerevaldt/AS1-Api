const express = require('express')
const router = express.Router()

// authentication
router.use('/token', require('./auth'))

module.exports = router
