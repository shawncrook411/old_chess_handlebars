const { Game, options } = require('./game.js')
const fs = require('fs')

game = new Game(options)

game.writeFEN()

console.log(game.options.FEN)

data = JSON.stringify(game, null, 2)
board = JSON.stringify(game.board, null, 2)

fs.writeFile(`./models/data/game${game.id}.json`, data, (err) => err ? console.error(err) : console.log("Successfully wrote game"))
fs.writeFile(`./models/data/board${game.id}.json`, board, (err) => err ? console.error(err) : console.log("Successfully wrote board"))


