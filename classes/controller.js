
const { Game, options } = require('./game.js')
const fs = require('fs')

options.FEN = 'r7/2n5/6p1/rk3np1/1b2P2p/1K1NP3/2p4P/1Q6 w - - 0 1'
game = new Game(options)

response = game.respond()
response = JSON.stringify(response, null, 2)
fs.writeFile('./data/response.json', response, (err) => err ? console.error(err) : {})

data = JSON.stringify(game, null, 2)
fs.writeFile(`./data/games/game.json`, data, (err) => err ? console.error(err) : {})

//En Passant target FEN

//Consolidate searches to SEARCH SQUARES BY INDEX... can then fix knight moves order

//Castling MOVES

//Promotion

//Check for CHECKS / CHECKMATE / DRAW50 / ThreeFold / Insufficient Material

//Fix illegal moves swapping moves

//Save unique games to the DB

//Generate games dynamically based on the PUT request body containing ID

//Sequelize to save GAMES : PLAYERS : 





