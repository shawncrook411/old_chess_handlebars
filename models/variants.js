const { Player, Piece, King, Queen, Rook, Bishop, Knight, Pawn } = require('./pieces.js')
const { Square , Board, options } = require('./board.js')

var initialize = (color, order, options, board) => {   
    let pieces = []



    for (let i = 0; i < order.length && i < options.sizeX; i++)
    {
        switch (order[i]){
            case 'k':
                pieces.push(new King(color, square))
            break

            case 'q':
                pieces.push(new Queen(color, square))
            break

            case 'r':
                pieces.push(new Rook(color, square))
            break

            case 'b':
                pieces.push(new Bishop(color, square))
            break

            case 'n':
                pieces.push(new Knight(color, square))
            break

            case 'p':
                pieces.push(new Pawn(color, square))
            break        
        }
    }



    player = new Player(color, pieces, options.time, options.increment)
    return player
}

var create = (color, options, board) => {
    classicOrder = [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    
    //TODO CREATE SQUARE PLACEMENT ORDER
    
    ]
    chess960 = []


    switch (options.variant){
        case '960': 
            return initialize(color, 960, options, board)

        default:
            return initialize(color, classicOrder, options, board)
    }
}


module.exports = { create }
