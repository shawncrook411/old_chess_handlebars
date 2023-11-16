const { Player, Piece, King, Queen, Rook, Bishop, Knight, Pawn } = require('./pieces.js')
const { Square , Board} = require('./board.js')
const { create } = require('./variants.js')
const uuid = require('./uuid.js')

const options =  
{        
    playersNumber : 2,
    time : 5,
    increment : 3,
    variant : 'classic',
    style : 'pixel',
    playerColors : ['White', 'Black'],
    boardColors : ['#1750AC', '#73B9EE'],
    sizeX : 8,
    sizeY : 8,   
}

class Game {
    constructor(options){      
        
        this.options = options
        this.id = uuid()
        
        this.board = new Board(options.sizeX, options.sizeY, options.playersNumber)
        this.moves = []
        
        let players = []
        for(let i = 0; i < options.playersNumber; i++)
        {
            players.push(create(options.playerColors[i], options))
        }
        this.players = players       
       
        
        }
    }
    

 module.exports = { Game, options }




//     options =  
// {        
//     playersNumber : 2,
//     time : 5,
//     increment : 3,
//     variant : 'classic',
//     style : 'pixel',
//     playerColors : ['White', 'Black'],
//     boardColors : ['#1750AC', '#73B9EE'],
//     sizeX : 8,
//     sizeY : 8,   
// }