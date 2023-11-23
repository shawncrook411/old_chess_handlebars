const app = require('./index.js')
const options = require('../helpers/options.js')


app.put('/newGame/', (req, res) => {
    req.body.fen ? options.FEN = req.body.fen : options.FEN = options.DefaultFEN
    game = new Game(options)


    options.FEN = options.DefaultFEN
    options.FEN = 'r1b2rk1/pp1qbppp/5n2/2pPp1B1/1n1P4/2N2N2/PPPQBPPP/R4RK1 w - c6 0 11'
    game = new Game(options)
    
    console.log(options)
    console.log(`Game created!\n ID:${game.id}\n at localhost:${PORT}`)


    res.json(game.respond())
})

app.put('/terminate', (req, res) => {

})

app.put('/forceDraw', (req, res) => {

})
