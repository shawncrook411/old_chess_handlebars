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

    DEMO__(start){
        let occupant = start.piece

        if (occupant === '0' || occupant.type === "Knight")
        { return []}

        let moves = []
        
        //Calculates distance to edge, based on thisBOARD's size based on the starting position of the search
        let distance = [
            this.sizeY - start.y,            
            this.sizeX - start.x,            
            start.y - 1,            
            start.x - 1,            
        ]
        
        //Calculates distance to edge, including the minimum for the diagnols
        let edge = [
            distance[0],
            Math.min(distance[0], distance[1]),
            distance[1],
            Math.min(distance[1], distance[2]),
            distance[2],
            Math.min(distance[2], distance[3]),
            distance[3],
            Math.min(distance[3], distance[0]),            
        ]

        //Each row is the 8 cardinal directions
        //Index 0 is for the change in X for that direction
        //Index 1 is for the change in Y for that direction
        //Index 2 is the maximum number of iterations until the edge is hit for that direction
        let master = [
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1]
        ]

        //8 hard coded for 8 cardinal directions
        direction: for(let i = 0; i < 8; i++)
        {
            if (occupant.matrix[i] === 0) { continue direction }
            
            
            to_edge: for(let k = 0; k < edge[i]; k++)
            {
                
                check_all_squares: for (let j = 0; j < this.squares.length; j++)
                {    
                    let test = this.squares[j]
                    if (test.x === start.x + (k+1)*master[i][0] && test.y === start.y + (k+1)*master[i][1])
                    {
                        if (occupant.type === 'Pawn')
                        {
                            if(i % 2 === 1 && test.piece !== '0' && test.piece.color !== occupant.color)
                            {
                                moves.push([test.x, test.y])
                            }
                            if(i % 2 === 0 && test.piece === '0')
                            {
                                moves.push([test.x, test.y])
                            }

                            //Allows for a second move to be calculated IF it's on the starting rank && you're facing the right direction
                            if (occupant.color === "White" && start.y === 2 && k === 0 && i === 0) {continue to_edge}
                            if (occupant.color === "Black" && start.y === (this.sizeY - 1) && k === 0 & i === 4) {continue to_edge}
    
                            continue direction
                        }
                        if (test.piece === '0')
                        {
                            moves.push([test.x, test.y])                            
                        }                        
                        if(test.piece !== '0' && test.piece.color != occupant.color)
                        {    
                            moves.push([test.x, test.y])
                            continue direction
                        }
                        if(test.piece !== '0')
                        {
                            continue direction
                        }

                            
                        

                        //Forces King and Pawns to only check once (unless the pawn checks again)
                        if(occupant.type === "King") {continue direction}
                        
                        continue to_edge
                    } 
                }
            }
        }
        return moves
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

        let master = [
            [1, 2],
            [2]

        ]

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
        //May be redundant not sure if 'null/undefined' is fixed. This eliminates them
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

