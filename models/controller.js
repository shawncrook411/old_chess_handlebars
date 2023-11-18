const { Game, options } = require('./game.js')
const fs = require('fs')

options.FEN = '6Q1/P1pP4/2PP2p1/1q4nP/1N4r1/K2p3r/8/k7 w - - 0 1'

game = new Game(options)
response = game.respond()

console.log(response)

//En Passant target FEN

//Consolidate searches to SEARCH SQUARES BY INDEX... can then fix knight moves order

//Castling MOVES

//Promotion...?


data = JSON.stringify(game, null, 2)
fs.writeFile(`./models/data/game.json`, data, (err) => err ? console.error(err) : {})


module.exports = {response}