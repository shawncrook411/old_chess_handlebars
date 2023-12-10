const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = 'r3k2r/ppp2ppp/2nqbn2/2bpp3/2B1P3/2NPBN2/PPP1QPPP/R3K2R b KQkq - 3 8'

const game = new Chess_Game(options)

game.submit('a8b8')


//Things to do !

//Promotion - need to allow way to pass this.promote from user

//Logging in 

//Protect only players from moving

//Refresh /listen to incoming move

//Implement Timing

//Calculate Check

//Calculate Checkmate

//Draws offers

// 3fold - Create table of previous FEN's?



