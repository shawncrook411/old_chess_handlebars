const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = '6K1/8/5r2/8/8/np4k1/8/8 w - - 0 1'

const game = new Chess_Game(options)

game.legals()


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



