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

router.put('/move', async (req, res) => {

})


router.put('/retrieve', async (req, res) => {
    try{
        const options = await readID(req.body.game_id)
        if(!options)
        {
            res.status(404).json("Game doesn't exist")
            return
        }
        const game = new Chess_Game(options)
    
        game.table()
        res.json(game)
    } catch(err) {
        console.log(err)
        res.json(err)
    }
})


module.exports = router