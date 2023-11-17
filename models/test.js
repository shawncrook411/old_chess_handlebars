const { Game, options } = require('./game.js')
const fs = require('fs')

game = new Game(options)


console.log(game)

data = JSON.stringify(game, null, 2)
board = JSON.stringify(game.board, null, 2)




fs.writeFile(`data/game${game.id}.json`, data, (err) => err ? console.error(err) : console.log("Successfully wrote game"))
fs.writeFile('data/board.json', board, (err) => err ? console.error(err) : console.log("Successfully wrote board"))


