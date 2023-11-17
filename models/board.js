const { create } = require('./variants')

class Square {
    constructor(x, y)
    {   
        //+1 so that they are 1-indexed
        this.x = x+1
        this.y = y+1    
        let column = String.fromCharCode(x + 65)

        this.position = 
        {
            //+1 so that they are 1-indexed
            column : column,
            row : y+1,
        }
        this.piece = []
    }
}

// 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' 

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
        this.position = position
        
        for (let i = 0; i < options.sizeY; i++)
        {
            for (let j = 0; j < options.sizeX; j++)
            {   
                let object = new Square(j, i)               
                squares.push(object)
            }
        }


        let newSquares = create(squares, options, position)
        this.squares = newSquares
    }

    //start is piece : distance is distance to edge exclusive
    SEARCH_UP(occupant, start, distance){
        distance = distance.up
        let moves = []

        for(let i = 0; i < distance; i++)
        {
            for (let j = 0; j < this.squares.length; j++)
            {

                let test = this.squares[j]
                if (test.x === start.x && test.y === start.y + (i+1))
                {
                    if (test.piece === '0')
                    {
                        moves.push([test.x, test.y])
                    }
                    else
                    {
                        if(test.piece.color != occupant.color)
                        {

                            moves.push([test.x, test.y])
                            return moves
                        }

                        return moves
                    }

                    if(occupant.type === "King") {return moves}
                    if(occupant.type === "Pawn" && occupant.color === "White" && start.x !=2) {return moves}
                    if(occupant.type === "Pawn" && i === 2) {return moves}
                } 
            }
        }
        return moves
    }

    SEARCH_DOWN(occupant, start, distance){
        distance = distance.down
        let moves = []
        for(let i = 0; i < distance; i++)
        {
            for (let j = 0; j < this.squares.length; j++)
            {
                let test = this.squares[j]

                if (test.x === start.x && test.y === start.y - (i+1))
                {
                    if (test.piece === '0')
                    {
                        moves.push([test.x, test.y])
                    }
                    else
                    {
                        if(test.piece.color != occupant.color)
                        {
                            moves.push([test.x, test.y])
                            return moves
                        }
                        return moves
                    }
                    if(occupant.type === "King") {return moves}
                    if(occupant.type === "Pawn" && occupant.color === "Black" && start.x != this.sizeY-1) {return moves}
                    if(occupant.type === "Pawn" && i === 2) {return moves}
                } 
            }
        }
        return moves
    }

    SEARCH_RIGHT(occupant, start, distance){
        distance = distance.right
        let moves = []
        for(let i = 0; i < distance; i++)
        {
            for (let j = 0; j < this.squares.length; j++)
            {
                let test = this.squares[j]
                if (test.x === start.x + (i+1) && test.y === start.y)
                {
                    if (test.piece === '0')
                    {
                        moves.push([test.x, test.y])
                    }
                    else
                    {
                        if(test.piece.color != occupant.color)
                        {
                            moves.push([test.x, test.y])
                            return moves
                        }
                        return moves
                    }
                    if(occupant.type === "King") {return moves}
                } 
            }
        }
        return moves
    }

    SEARCH_LEFT(occupant, start, distance){
        distance = distance.left
        let moves = []
        for(let i = 0; i < distance; i++)
        {
            for (let j = 0; j < this.squares.length; j++)
            {
                let test = this.squares[j]
                if (test.x === start.x - (i+1) && test.y === start.y)
                {
                    if (test.piece === '0')
                    {
                        moves.push([test.x, test.y])
                    }
                    else
                    {
                        if(test.piece.color != occupant.color)
                        {
                            moves.push([test.x, test.y])
                            return moves
                        }
                        return moves
                    }
                    if(occupant.type === "King") {return moves}
                } 
            }
        }
        return moves
    }
    
    SEARCH_UP_RIGHT(occupant, start, distance){
        if (distance.up > distance.right)
        {distance = distance.up}
        else {distance = distance.right}

        let moves = []
        for(let i = 0; i < distance; i++)
        {
            for (let j = 0; j < this.squares.length; j++)
            {
                let test = this.squares[j]
                if (test.x === start.x + (i+1) && test.y === start.y + (i+1))
                {
                    if (test.piece === '0')
                    {
                        moves.push([test.x, test.y])
                    }
                    else
                    {
                        if(test.piece.color != occupant.color)
                        {
                            moves.push([test.x, test.y])
                            return moves
                        }
                        return moves
                    }
                    if(occupant.type === "King") {return moves}
                } 
            }
        }
        return moves
    }

    SEARCH_DOWN_RIGHT(occupant, start, distance){
        if (distance.down > distance.right)
        {distance = distance.down}
        else {distance = distance.right}

        let moves = []
        for(let i = 0; i < distance; i++)
        {
            for (let j = 0; j < this.squares.length; j++)
            {
                let test = this.squares[j]
                if (test.x === start.x + (i+1) && test.y === start.y - (i+1))
                {
                    if (test.piece === '0')
                    {
                        moves.push([test.x, test.y])
                    }
                    else
                    {
                        if(test.piece.color != occupant.color)
                        {
                            moves.push([test.x, test.y])
                            return moves
                        }
                        return moves
                    }
                    if(occupant.type === "King") {return moves}
                } 
            }
        }
        return moves
    }

    SEARCH_DOWN_LEFT(occupant, start, distance){
        if (distance.down > distance.left)
        {distance = distance.down}
        else {distance = distance.left}

        let moves = []
        for(let i = 0; i < distance; i++)
        {
            for (let j = 0; j < this.squares.length; j++)
            {
                let test = this.squares[j]
                if (test.x === start.x - (i+1) && test.y === start.y - (i+1))
                {
                    if (test.piece === '0')
                    {
                        moves.push([test.x, test.y])
                    }
                    else
                    {
                        if(test.piece.color != occupant.color)
                        {
                            moves.push([test.x, test.y])
                            return moves
                        }
                        return moves
                    }        
                    if(occupant.type === "King") {return moves}
                } 
            }
        }
        return moves
    }

    SEARCH_UP_LEFT(occupant, start, distance){
        if (distance.up > distance.left)
        {distance = distance.up}
        else {distance = distance.left}

        let moves = []
        for(let i = 0; i < distance; i++)
        {
            for (let j = 0; j < this.squares.length; j++)
            {
                let test = this.squares[j]
                if (test.x === start.x - (i+1) && test.y === start.y + (i+1))
                {
                    if (test.piece === '0')
                    {
                        moves.push([test.x, test.y])
                    }
                    else
                    {
                        if(test.piece.color != occupant.color)
                        {
                            moves.push([test.x, test.y])
                            return moves
                        }
                        return moves
                    }
                    if(occupant.type === "King") {return moves}
                } 
            }
        }
        return moves
    }

    SEARCH_KNIGHT(occupant, start, up, down, left, right){

        let moves = []
        for (let j = 0; j < this.squares.length; j++)
        {
            let test = this.squares[j]
            //1 right 2 up 
            if (right >= 1 && up >= 2 &&  test.x === start.x + 1 && test.y === start.y + 2)
            {            
               
                if(test.piece.color != occupant.color)
                {
                    moves.push([test.x, test.y])
                }                
            }
            
            //2 right 1 up
            if (right >= 2 && up >= 1 && test.x === start.x + 2 && test.y === start.y + 1)
            {
                if(test.piece.color != occupant.color)
                {
                    moves.push([test.x, test.y])
                }                
            } 
            //2 right 1 down
            if (right >= 2 && down >= 1 && test.x === start.x + 2 && test.y === start.y - 1)
            {
                if(test.piece.color != occupant.color)
                {
                    moves.push([test.x, test.y])
                }                
            }
            
            //1 right 2 down
            if (right >= 1 && down >= 2 && test.x === start.x + 1 && test.y === start.y - 2)
            {
                if(test.piece.color != occupant.color)
                {
                    moves.push([test.x, test.y])
                }                
            }

            //1 left 2 down
            if (left >= 1 && down >= 2 && test.x === start.x - 1 && test.y === start.y - 2)
            {
                if(test.piece.color != occupant.color)
                {
                    moves.push([test.x, test.y])
                }                
            }

            //2 left 1 down
            if (left >= 2 && down >= 1 && test.x === start.x - 2 && test.y === start.y - 1)
            {
                if(test.piece.color != occupant.color)
                {
                    moves.push([test.x, test.y])
                }                
            }

            //2 left 1 up
            if (left >= 2 && up >= 1 && test.x === start.x - 2 && test.y === start.y + 1)
            {
                if(test.piece.color != occupant.color)
                {
                    moves.push([test.x, test.y])
                }                
            }

            //1 left 2 up
            if (left >= 1 && up >= 2 && test.x === start.x - 1 && test.y === start.y + 2)
            {
                if(test.piece.color != occupant.color)
                {
                    moves.push([test.x, test.y])
                }                
            }
        }
        return moves
    }

    SEARCH(start){

        let distance = {
            up : this.sizeY - start.y,
            right: this.sizeX - start.x,
            down: start.y - 1,
            left: start.x - 1,
        }

        let moves = [];
        let occupant = start.piece

        
        switch(occupant.type)
        {
            case "King", "Queen":
                moves = moves.concat(this.SEARCH_UP(occupant, start, distance))
                moves = moves.concat(this.SEARCH_UP_RIGHT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_RIGHT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_DOWN_RIGHT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_DOWN(occupant, start, distance))
                moves = moves.concat(this.SEARCH_DOWN_LEFT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_LEFT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_UP_LEFT(occupant, start, distance))
            break

            case "Rook":
                moves = moves.concat(this.SEARCH_UP(occupant, start, distance))
                moves = moves.concat(this.SEARCH_RIGHT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_DOWN(occupant, start, distance))
                moves = moves.concat(this.SEARCH_LEFT(occupant, start, distance))
            break

            case "Bishop":
                moves = moves.concat(this.SEARCH_UP_RIGHT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_DOWN_RIGHT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_DOWN_LEFT(occupant, start, distance))
                moves = moves.concat(this.SEARCH_UP_LEFT(occupant, start, distance))
            break

            case "Knight":
                moves = moves.concat(this.SEARCH_KNIGHT(occupant, start, distance.up, distance.down, distance.left, distance.right))
            break

            case "Pawn":
                if (occupant.color === "White")
                {
                    moves = moves.concat(this.SEARCH_UP(occupant, start, distance))
                }
                else
                {
                    moves = moves.concat(this.SEARCH_DOWN(occupant, start, distance))
                }
            break            
        }
        let newmoves = []
        for (let i = 0; i < moves.length; i++)
        {
            if (typeof moves[i] === 'object')
            {
                newmoves.push(moves[i])
            }
        
        }
        return newmoves      
    }


//for each square in board
            //check if square shares a column, row, or diagnol, or knight L
            //if valid, check every square in between if occupied
            
    

    MOVE(start, end){ // if occupied capture, then move
    }

    CAPTURE(end){

    }
}

module.exports = { Square, Board, Position }

