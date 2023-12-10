const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = '7K/4r3/6k1/8/6n1/1p6/8/8 b - - 25 13'

const game = new Chess_Game(options)

console.log(game.check)
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



