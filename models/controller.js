
const { Game, options } = require('./game.js')
const fs = require('fs')

options.FEN = '8/2p1rN2/p3P3/1BNP4/6bQ/2k1b2r/5p2/1K4B1 w - - 0 1'
game = new Game(options)
response = game.respond()

game.submit('Qxf2')

newresponse = game.respond()

data = JSON.stringify(game, null, 2)
response = JSON.stringify(response, null, 2)
newresponse = JSON.stringify(newresponse, null, 2)

fs.writeFile(`./data/game.json`, data, (err) => err ? console.error(err) : {})
fs.writeFile('./data/response.json', response, (err) => err ? console.error(err) : {})
fs.writeFile('./data/newresponse.json', newresponse, (err) => err ? console.error(err) : {})

//En Passant target FEN

//Consolidate searches to SEARCH SQUARES BY INDEX... can then fix knight moves order

//Castling MOVES

//Promotion...?

