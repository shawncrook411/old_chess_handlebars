const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = '8/8/8/8/8/4N1B1/8/1K5k b - - 45 6'

const game = new Chess_Game(options)

game.submit('Kg1')
game.submit('Ka1')


//Things to do !

//Promotion - need to allow way to pass this.promote from user

//Filter moves that are identical : Rb1 Rb1 => Rab1 Rcb1

//Refresh /listen to incoming move

//Implement Timing

//Allow to flip the board if playing as black

//Draws offers

// 3fold - Create table of previous FEN's?