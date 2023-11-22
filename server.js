const express = require('express')
const path = require('path')
const { Game, options } = require('./models/game.js')
const fs = require('fs')


const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded( {extended : true }))
app.use(express.static('public'))

app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.put('/newGame/', (req, res) => {
    req.body.fen ? options.FEN = req.body.fen : options.FEN = options.DefaultFEN
    game = new Game(options)
    res.json(game.respond())
})

app.put('/response/', (req, res) => {
    res.json(game.respond())
})

app.put('/submitMove/:move', (req, res) => {
    game.submit(req.params.move)
    res.json(game.respond())
})

app.listen(PORT, () => {
    options.FEN = options.DefaultFEN
    game = new Game(options)
    console.log(options)
    console.log(`Game created!\n ID:${game.id}\n at localhost:${PORT}`)
})






