const { King, Queen, Rook, Bishop, Knight, Pawn } = require('./pieces.js')

var initialize = (squares, options, position) => {   
   
    let pieces = [];

    for (let i = 0; i < position.placement.length; i++)
    {
        let row = []
        for(let j = 0; j < position.placement[i].length; j++)
        {
            let color = 'White';
            if(position.placement[i][j].toLowerCase() === position.placement[i][j])
            {
                color = 'Black'
            }       

            switch (position.placement[i][j].toLowerCase()){
                case 'k':
                    row.push(new King(color))
                break

                case 'q':
                    row.push(new Queen(color))
                break

                case 'r':
                    row.push(new Rook(color))
                break

                case 'b':
                    row.push(new Bishop(color))
                break

                case 'n':
                    row.push(new Knight(color))
                break

                case 'p':
                    row.push(new Pawn(color))
                break
                
                default :
                    row.push('0')
                break
            }
        }
        pieces = row.concat(pieces)
    }

    for(let i = 0 ; i < squares.length; i++)
    {
        squares[i].piece = pieces[i]
    }
    return squares
}

var create = (squares, options, position) => {   
    
    chess960 = []
    switch (options.variant){
        case '960': 
            return initialize(color, options, position)

        default:
            if(!options.FEN)
            {
                options.FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
            }
            return initialize(squares, options, position)
    }
}


module.exports = { create }
