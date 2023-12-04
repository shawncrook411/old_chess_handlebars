const router = require('express').Router()
const { Game, Default } = require('../classes/index')
const { User, Player, Preferences, Chess, Chess4} = require('../models/index')

router.put('/newGame', (req, res) => {
    const options = Default
    req.body.fen ? options.FEN = req.body.fen : options.FEN = options.DefaultFEN
    const game = new Game(options)

    // options.FEN = Default.DefaultFEN
    // options.FEN = 'r1b2rk1/pp1qbppp/5n2/2pPp1B1/1n1P4/2N2N2/PPPQBPPP/R4RK1 w - c6 0 11'
    // game = new Game(options)
    
    console.log(options)
    console.log(`Game created!\n ID:${game.id}\n`)

    res.json(game.respond())
})

router.put('/response/:id', async(req, res) => {
    try { 
        const id = req.params.id
        const data = await Chess.findByPk(id)
        const response = new Game(data).respond()
        res.json(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})





module.exports = router