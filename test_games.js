const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = '8/R7/8/1r6/8/K7/4k3/7r b - - 3 2'

const game = new Chess_Game(options)

game.submit('Rb1')



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



