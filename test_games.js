const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = '2QNK3/b5P1/3R4/1Pp2B2/2q5/3P1Pp1/1B1p4/4k3 b - - 0 '
const game = new Chess_Game(options)

console.log(game.legalStrings)
game.table()
