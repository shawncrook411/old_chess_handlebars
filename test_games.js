const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = 'rnbqkbnr/pppp1ppp/8/4P3/5p2/8/PPPP2PP/RNBQKBNR b KQkq - 0 3'

const game = new Chess_Game(options)

game.submit('f5')
game.table()
game.legals()

//Things to do !

//Promotion

//Castling

//En Passant

//Logging in 

//Protect only players from moving

//Refresh /listen to incoming move

//Implement Timing

//Calculate Check

//Calculate Checkmate

//Calculate Stalemate

//Draws offers
// 50move 
// 3fold - Create table of previous FEN's?
// insufficient materials



