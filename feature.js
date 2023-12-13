const { Chess_Game, Default } = require('./games/chess')

const options = {...Default}
options.FEN = '8/8/8/8/8/4N1B1/8/1K5k b - - 45 6'

const game = new Chess_Game(options)

game.submit('Kg1')
game.submit('Ka1')


//Things to do !

//Update elo calculations, doesn't take the new file properly need to pass game as parameter

//Promotion - need to allow way to pass this.promote from user

//Allow timeout method to calculate IF winning time CAN win. Maybe use npm..?

//Refresh /listen to incoming move

//Implement Timing based on the updated_at column instead of stored in the browser

//Allow to flip the board if playing as black

//Draws offers

// 3fold - Create table of previous FEN's?