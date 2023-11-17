const { Game, options } = require('./game.js')
const fs = require('fs')

options.FEN = '2b2k2/R4pp1/4q2p/8/1n2P3/1N3PK1/r2Q1B1P/8 b - - 1 26'

game = new Game(options)

result = []



for( let i = 0; i < game.board.squares.length; i++)
{
    search = game.board.squares[i]
    piece = game.board.SEARCH(search)

    search.result = piece
    result = result.concat(search)
}


//Pawns DOUBLE move doesn't work properly
//Pawn capture
//En Passant target FEN

//Kings aren't loading at all

//Combines SEARCH functions into SEARCH and SEARCH KNIGHT only

//Castling MOVES





















data = JSON.stringify(game, null, 2)
result = JSON.stringify(result, null, 2)
fs.writeFile(`./models/data/game.json`, data, (err) => err ? console.error(err) : {})
fs.writeFile(`./models/data/search.json`, result, (err) => err ? console.error(err) : {})


