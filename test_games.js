const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
// options.FEN = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'
const game = new Chess_Game(options)

game.table()

