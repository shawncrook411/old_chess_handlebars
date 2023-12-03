const app = require('./index.js')
const { Game, Response, options } = require('../models/game.js')

app.get('/game', (req, res) => {
    opt = new options()
    const game = new Game(opt)
    res.json(game)
})

