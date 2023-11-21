const express = require('express')
const path = require('path')
const { Game, Response, options } = require('./models/game.js')
const fs = require('fs')


const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded( {extended : true }))
app.use(express.static('public'))

app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, 'public/index.html'))})

app.put('/response/', (req, res) => {
    req.body.fen ? options.FEN = req.body.fen : options.FEN = options.DefaultFEN
    game = new Game(options)
    res.json(game.respond())
})

app.listen(PORT, () =>
    console.log(`Server listening at localhost:${PORT}`))






