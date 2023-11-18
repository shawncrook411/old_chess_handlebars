const { Game, options } = require('./game.js')
const fs = require('fs')

options.FEN = '5B2/1PP1r3/P3k3/8/K4np1/2pp2R1/1q2PNp1/8 w - - 0 1'

game = new Game(options)

let result = []
for(let i = 0; i < game.board.squares.length; i++)
{
    r = game.board.SEARCH(game.board.squares[i])
    result.push(r)
}


//En Passant target FEN

//Consolidate searches to SEARCH SQUARES BY INDEX... can then fix knight moves order

//Castling MOVES

//Promotion...?



data = JSON.stringify(game, null, 2)
result = JSON.stringify(result, null, 2)
fs.writeFile(`./models/data/game.json`, data, (err) => err ? console.error(err) : {})
fs.writeFile(`./models/data/search.json`, result, (err) => err ? console.error(err) : {})


