const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = 'rnQq2nr/ppp1k1pp/8/5Q2/1b6/5N2/PPPP2pP/RNB1KB1R b KQ - 1 9'

const game = new Chess_Game(options)


game.submit('g1')
game.table()

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



