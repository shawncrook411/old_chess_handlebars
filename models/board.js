const { create } = require('./variants')

class Square {
    constructor(x, y)
    {       
        let column = String.fromCharCode(x + 65)

        this.positon = 
        {
            //+1 so that they are 1-indexed
            coordinates : [x+1, y+1],
            column : column,
            row : y+1,
        }
        this.piece = []
    }
}

class Position {
    constructor(FEN)
    {
        let array = FEN.split(' ')

        let placement = array[0].split('/')
        let newplacement = [];

        for (let i = 0; i < placement.length; i++)
        {
            let newstring = ''
            for(let j = 0; j < placement[i].length; j++)
            {
                if((Number(placement[i][j])))
                {
                    let zero = '0'
                    
                    newstring += zero.repeat(Number(placement[i][j]))
                }
                else
                {
                    newstring += placement[i][j]
                }
            }
            newplacement.push(newstring)
        }   
        
        this.placement = newplacement
        this.turn = array[1]
        this.castling = array[2]
        this.enPassant = array[3]
        this.draw50 = array[4]
        this.moveCount = array[5]
    }
}

class Board {
    constructor(options)
    {
        this.sizeX = options.sizeX
        this.sizeY = options.sizeY
        this.playersCount = options.playersCount
        let squares = []
        
        let position = new Position(options.FEN)
        this.postion = position
        
        for (let i = 0; i < options.sizeY; i++)
        {
            for (let j = 0; j < options.sizeX; j++)
            {   
                let object = new Square(i, j)               
                squares.push(object)
            }
        }


        let newSquares = create(squares, options, position)
        this.squares = newSquares
        this.position;


    }
}

module.exports = { Square, Board, Position }

