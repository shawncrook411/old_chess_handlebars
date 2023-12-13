const router = require('express').Router()

const chess = require('./chess')
const connect4 = require('./connect4')
const tic_tac_toe = require('./tic-tac-toe')
const snake = require('./snake')

router.use('/chess', chess)
router.use('/connect4', connect4 )
router.use('/tic-tac-toe', tic_tac_toe )
router.use('/snake', snake )

module.exports = router