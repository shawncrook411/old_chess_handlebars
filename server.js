const express = require('express')
const path = require('path')
const { Game, options } = require('./models/game.js')
const fs = require('fs')

write = function(FEN)
{
    options.FEN = FEN
    game = new Game(options)
    response = game.respond()

    data = JSON.stringify(game, null, 2)
    response = JSON.stringify(response, null, 2)
    fs.writeFile(`./data/game.json`, data, (err) => err ? console.error(err) : {})
    fs.writeFile('./data/response.json', response, (err) => err ? console.error(err) : {})
}

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded( {extended : true }))
app.use(express.static('public'))

app.put('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html')))

app.put('/response/', (req, res) => {
    write(req.body.fen)
    res.sendFile(path.join(__dirname, 'data/response.json'))}) 

app.listen(PORT, () =>
    console.log(`Server listening at localhost:${PORT}`))






