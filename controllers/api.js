const router = require('express').Router()

const chess = require('./chess.js')
const snakeRoute = require('./snake');
const tic_tac_toe_Router = require('./tic-tac-toe');
const connect4Router = require('./connect4')


router.use('/chess', chess)
router.use('/snake', snakeRoute);
router.use('/tic-tac-toe', tic_tac_toe_Router);
router.use('/connect4', connect4Router)


module.exports = router