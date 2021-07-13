const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

// route modules
router.use('/', home)
router.use('/restaurants', restaurants)

// export route
module.exports = router