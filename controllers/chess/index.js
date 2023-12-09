const { Chess_Game, Default } = require ('../../games/chess')
const { Chess, User } = require ('../../models/index')
const { readID, writeID, writeNewGame } = require('../../utils/chess/read-write')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({message: 'good'})
})

router.post('/newGame', async (req, res) => {
    const newGame = await writeNewGame(req.body)

    const game = new Chess_Game(newGame)
    game.table()
    res.json(game)

})




module.exports = router