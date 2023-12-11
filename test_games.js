const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = '8/8/8/8/8/4N1B1/8/1K5k b - - 45 6'

const game = new Chess_Game(options)

game.submit('Kg1')
game.submit('Ka1')

console.log(game.movelist)

//Things to do !

//Promotion - need to allow way to pass this.promote from user

//Filter moves to add '#' tag

//Filter moves that are identical : Rb1 Rb1 => Rab1 Rcb1

//Logging in 

//Protect only players from moving

//Refresh /listen to incoming move

//Implement Timing

//Draws offers

// 3fold - Create table of previous FEN's?



