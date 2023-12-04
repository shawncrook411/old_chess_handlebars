
const { Game, Default } = require('./game.js')
const fs = require('fs')


game = new Game(Default)

response = game.respond()
response = JSON.stringify(response, null, 2)
fs.writeFile('./data/response.json', response, (err) => err ? console.error(err) : {})

data = JSON.stringify(game, null, 2)
fs.writeFile(`./data/games/game.json`, data, (err) => err ? console.error(err) : {})

// console.log(response)

//En Passant target FEN

//Consolidate searches to SEARCH SQUARES BY INDEX... can then fix knight moves order

//Castling MOVES

//Promotion

//Check for CHECKS / CHECKMATE / DRAW50 / ThreeFold / Insufficient Material

//Fix illegal moves swapping moves

//Save unique games to the DB

//Generate games dynamically based on the PUT request body containing ID

//Sequelize to save GAMES : PLAYERS : 





