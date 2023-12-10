const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = '4k3/3p4/8/1B6/5R2/8/8/4K3 b - - 1 2'
options.width = 8

const game = new Chess_Game(options)
game.table()

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



