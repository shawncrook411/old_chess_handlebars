
const { Game, options } = require('./game.js')
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

//En Passant target FEN

//Consolidate searches to SEARCH SQUARES BY INDEX... can then fix knight moves order

//Castling MOVES

//Promotion...?

module.exports = { write }