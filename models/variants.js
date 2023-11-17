const { King, Queen, Rook, Bishop, Knight, Pawn } = require('./pieces.js')

var initialize = (squares, options, position) => {   
   
    let pieces = [];
   

    for (let i = 0; i < position.placement.length; i++)
    {
        for(let j = 0; j < position.placement[i].length; j++)
        { 

            let color = 'White';
            if(position.placement[i][j].toLowerCase() != position.placement[i][j])
            {
                color = 'Black'
            }       

            switch (position.placement[i][j].toLowerCase()){
                case 'k':
                    pieces.push(new King(color))
                break

                case 'q':
                    pieces.push(new Queen(color))
                break

                case 'r':
                    pieces.push(new Rook(color))
                break

                case 'b':
                    pieces.push(new Bishop(color))
                break

                case 'n':
                    pieces.push(new Knight(color))
                break

                case 'p':
                    pieces.push(new Pawn(color))
                break
                
                default :
                    pieces.push('0')
                break
            }        
        }
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
