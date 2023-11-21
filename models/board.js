const { create } = require('./variants')
const { Player } = require('./pieces')

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
                    //Postion Array Spacer
                    let spacer = '-'                    
                    newstring += spacer.repeat(Number(placement[i][j]))
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
        this.legal 
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

    SEARCH_ALL(){
        let legal = [];
        for (let i = 0; i < this.squares.length; i++)
        {
            legal.concat(this.SEARCH(this.squares[i]))
        }
    }

    SEARCH(start){

        let occupant = start.piece

        if (occupant === '0')
        { return [] }
        if (occupant.type === "Knight")
        { 
            return this.SEARCH_KNIGHT(start)            
        }

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
                            {   //Format exf4
                                moves.push(`${String.fromCharCode(start.x + 96)}x${String.fromCharCode(test.x + 96)}${test.y}`)
                            }
                            if(i % 2 === 0 && test.piece === '0')
                            {   //Format f4                                
                                moves.push(`${String.fromCharCode(test.x + 96)}${test.y}`)
                            }

                            //Allows for a second move to be calculated IF it's on the starting rank && you're facing the right direction
                            if (occupant.color === "White" && start.y === 2 && k === 0 && i === 0) {continue to_edge}
                            if (occupant.color === "Black" && start.y === (this.sizeY - 1) && k === 0 & i === 4) {continue to_edge}
    
                            continue direction
                        }
                        if (test.piece === '0')
                        {
                            //Format Rg4
                            moves.push(`${occupant.type[0]}${String.fromCharCode(test.x + 96)}${test.y}`)                            
                        }                        
                        if(test.piece !== '0' && test.piece.color != occupant.color)
                        {    
                            //Format Rxg4
                            moves.push(`${occupant.type[0]}x${String.fromCharCode(test.x + 96)}${test.y}`)
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
        occupant.moves = moves
        return moves
    }

    SEARCH_KNIGHT(start){

        let occupant = start.piece;

        let distance = [
            this.sizeY - start.y,            
            this.sizeX - start.x,            
            start.y - 1,            
            start.x - 1,            
        ]

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
        
        let master = [
            [1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1],
            [-2, 1],
            [-1, 2]
        ]
        
        let moves = []
        for (let j = 0; j < this.squares.length; j++)
        {
            let test = this.squares[j]
            //1 up 2 right
            if (edge[2] >= 1 &&edge[0]>= 2 &&  test.x === start.x + master[0][0] && test.y === start.y + master[0][1])
            {       
                if(test.piece === '0')
                {moves.push(`N${String.fromCharCode(test.x + 96)}${test.y}`)}

                else if (test.piece.color != occupant.color)
                {moves.push(`Nx${String.fromCharCode(test.x + 96)}${test.y}`)}               
            }
            
            //2 right 1 up
            if (edge[2] >= 2 &&edge[0]>= 1 && test.x === start.x + master[1][0] && test.y === start.y + master[1][1])
            {
                if(test.piece === '0')
                {moves.push(`N${String.fromCharCode(test.x + 96)}${test.y}`)}

                else if (test.piece.color != occupant.color)
                {moves.push(`Nx${String.fromCharCode(test.x + 96)}${test.y}`)}               
            } 
            //2 right 1 down
            if (edge[2] >= 2 && edge[4] >= 1 && test.x === start.x + master[2][0] && test.y === start.y + master[2][1])
            {
                if(test.piece === '0')
                {moves.push(`N${String.fromCharCode(test.x + 96)}${test.y}`)}

                else if (test.piece.color != occupant.color)
                {moves.push(`Nx${String.fromCharCode(test.x + 96)}${test.y}`)}               
            }
            
            //1 right 2 down
            if (edge[2] >= 1 && edge[4] >= 2 && test.x === start.x + master[3][0] && test.y === start.y + master[3][1])
            {
                if(test.piece === '0')
                {moves.push(`N${String.fromCharCode(test.x + 96)}${test.y}`)}

                else if (test.piece.color != occupant.color)
                {moves.push(`Nx${String.fromCharCode(test.x + 96)}${test.y}`)}               
            }

            //1 left 2 down
            if (edge[6] >= 1 && edge[4] >= 2 && test.x === start.x + master[4][0] && test.y === start.y + master[4][1])
            {
                if(test.piece === '0')
                {moves.push(`N${String.fromCharCode(test.x + 96)}${test.y}`)}

                else if (test.piece.color != occupant.color)
                {moves.push(`Nx${String.fromCharCode(test.x + 96)}${test.y}`)}               
            }

            //2 left 1 down
            if (edge[6] >= 2 && edge[4] >= 1 && test.x === start.x + master[5][0] && test.y === start.y + master[5][1])
            {
                if(test.piece === '0')
                {moves.push(`N${String.fromCharCode(test.x + 96)}${test.y}`)}

                else if (test.piece.color != occupant.color)
                {moves.push(`Nx${String.fromCharCode(test.x + 96)}${test.y}`)}               
            }

            //2 left 1 up
            if (edge[6] >= 2 &&edge[0]>= 1 && test.x === start.x + master[6][0] && test.y === start.y + master[6][1])
            {
                if(test.piece === '0')
                {moves.push(`N${String.fromCharCode(test.x + 96)}${test.y}`)}

                else if (test.piece.color != occupant.color)
                {moves.push(`Nx${String.fromCharCode(test.x + 96)}${test.y}`)}               
            }

            //1 left 2 up
            if (edge[6] >= 1 &&edge[0]>= 2 && test.x === start.x + master[7][0] && test.y === start.y + master[7][1])
            {
                if(test.piece === '0')
                {moves.push(`N${String.fromCharCode(test.x + 96)}${test.y}`)}

                else if (test.piece.color != occupant.color)
                {moves.push(`Nx${String.fromCharCode(test.x + 96)}${test.y}`)}               
            }
        }

        console.log(moves)

        //May be redundant not sure if 'null/undefined' is fixed. This eliminates them
        
        
        occupant.moves = moves

        
        return moves
    }    

    MOVE(start, end){ // if occupied capture, then move
    }

    CAPTURE(end){

    }
}

module.exports = { Square, Board, Position }

