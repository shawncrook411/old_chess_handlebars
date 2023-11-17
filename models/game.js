const { Board } = require('./board.js')
const uuid = require('./uuid.js')
const dayjs = require('dayjs')


const options =  
{        
    players : [],
    playersNumber : 2,
    time : 5,
    increment : 3,
    variant : 'classic',
    style : 'pixel',
    playerColors : ['White', 'Black'],
    boardColors : ['#1750AC', '#73B9EE'],
    sizeX : 8,
    sizeY : 8,
    FEN : '8/8/8/8/6pN/7p/7p/1KR3nk w--0 1'    
    // FEN : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' 

}

class Game {
    constructor(options){      
        this.options = options
        this.id = uuid()
        this.result = 'In progress'
        this.termination = ''
        this.date = dayjs()
        
        this.board = new Board(options)
        this.moves = []         
        this.players = options.players    
    }
}
   

module.exports = { Game, options }
