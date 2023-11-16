const { Game, options } = require('./initialize')
const fs = require('fs')

game = new Game(options)


data = JSON.stringify(game, null, 2)
players = JSON.stringify(game.players, null, 2)
board = JSON.stringify(game.board, null, 2)

fs.writeFile('data/game.json', data, (err) => err ? console.error(err) : console.log("Successfully wrote game"))
fs.writeFile('data/players.json', players, (err) => err ? console.error(err) : console.log("Successfully wrote players"))
fs.writeFile('data/board.json', board, (err) => err ? console.error(err) : console.log("Successfully wrote board"))




