const express = require('express')

const router = express.Router()

const pinController = require('../controllers/pinController')

router.post('/api/pins', pinController.new)
router.get('/api/pins', pinController.getAll)

module.exports = router