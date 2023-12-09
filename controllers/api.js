const router = require('express').Router()

const chess = require('./chess')

router.use('/chess', chess)

module.exports = router