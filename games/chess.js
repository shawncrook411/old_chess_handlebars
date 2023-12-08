var convert_x = function(x) { return String.fromCharCode(x + 97) }
var convert_y = function(y) { return String.fromCharCode(y + 1 ) }


class Square{
    constructor(x, y, occupant){
        this.x = x,
        this.y = y,
        this.occupant = occupant
        this.id = `${String.fromCharCode(y + 65)}${x+1}`
    }}

class Piece{
    constructor(color, type){
        this.color = color
        this.type = type
        this.moved = 0
        
        switch(type){
            case "Pawn":
                if(color === 'w')   this.matrix = [1, 1, 0, 0, 0, 0, 0, 1]
                else                this.matrix = [0, 0, 0, 1, 1, 1, 0, 0]
                break            
            case "King":
                this.matrix = [1, 1, 1, 1, 1, 1 ,1 ,1]
                break
            case "Queen":
                this.matrix = [1, 1, 1, 1, 1, 1 ,1 ,1]
                break
            case "Rook":
                this.matrix = [1, 0, 1, 0, 1, 0, 1, 0]
                break
            case "Knight":
                this.matrix = [0, 0, 0, 0, 0, 0, 0, 0]
                break
            case "Bishop":
                this.matrix = [0, 1, 0, 1, 0, 1, 0, 1]
                break
        }
    }
}

const Default = 
{
    FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    variant : 1,
    time : 5,
    inc : 3,
    bonus: false,
    width : 8,
    height : 8,
    status : true,
    turn : 1,
    moves : 0,
}

class Chess_Game {
    constructor(options){
        this.id = options.id
        this.FEN = options.FEN
        this.legal = []
        this.board = []
        this.player_1 = options.player_1
        this.player_2 = options.player_2
        this.variant = options.variant
        this.time = options.time
        this.inc = options.inc
        this.bonus = options.bonus
        this.width = options.width
        this.height = options.height
        this.status = options.status
        this.turn = options.turn
        this.moves = options.moves
        this.target = options.target
        this.result = options.result
        this.termination = options.termination
        this.opening = options.opening

        this.initialize()
    }

    initialize(){
        newRow: for (let y = 0; y < this.height; y++){
            let row = []
            newSquare: for (let x = 0; x < this.width; x++){
                const broken = this.breakFEN()

                let occupant = broken.placement[x][y]
                if (occupant === '-') occupant = '0'
                row.push( new Square(x, y, occupant))
            }
            this.board.splice(0, 0, row)
        }
    }

    search(){
        let legal = []
        let legalStrings = []
        checkRowStart: for (let row of this.board){
            checkSquareStart: for (let start of row) {
                let occupant = start.piece

                //If unoccupied, can't move
                if (occupant === '0') continue checkSquareStart

                //If it's not that pieces turn, can't move
                if (occupant.color !== this.turn) continue checkSquareStart

                if (occupant.type === 'Knight')
                {
                    let results = this.search_KNIGHT()
                    let knightMoves = results[0]
                    let knightStrings = results [1]                    

                    legal.push( ...{knightMoves})
                    legalStrings.push( ...{knightStrings})
                    continue checkSquareStart
                }

                //Calculates distance to edge, based on board size and starting position of the search
                const distance = [
                    this.height - start.y - 1,
                    this.width -  start.x - 1,
                    start.y,
                    start.x,
                ]

                //Calculates distance to edge, including the minimum for the diagnols
                const edge = [
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
                    {x:  0,  y:  1},
                    {x:  1,  y:  1},
                    {x:  1,  y:  0},
                    {x:  1,  y: -1},
                    {x:  0,  y: -1},
                    {x: -1,  y: -1},
                    {x: -1,  y:  0},
                    {x: -1,  y:  1},
                ]

                direction: for(let direction = 0; direction < 8; direction++){

                    if (occupant.matrix[direction] === 0) continue direction

                    to_edge: for(let distance = 1; distance <= edge[direction]; distance++){

                        next_x = start.x + (distance * master[direction].x)
                        next_y = start.y + (distance * master[direction].y)

                        let test = this.board[next_x][next_y]
                        
                        if(occupant.type === 'Pawn'){

                            //If in diagnol direction, the test square is occupied and can be captured
                            if(direction % 2 && test.occupant !== '0' && test.occupant.color){
                                //Format exf4
                                let moveString = `${convert_x(start.x)}x${convert_x(test.x)}${convert_y(test.y)}`
                                legalStrings.push(moveString)
                                //Format e2e4
                                let move = `${convert_x(start.x)}${convert_y(start.y)}${convert_x(test.x)}${convert_y(test.y)}`
                                legal.push(move)
                            }

                            if(direction % 2 === 0 && test.piece ==='0'){
                                //Format f4
                                let moveString = `${convert_x(test.x)}${convert_y(test.y)}}`
                                legalStrings.push(moveString)
                                //Format e2e4
                                let move = `${convert_x(start.x)}${convert_y(start.y)}${convert_x(test.x)}${convert_y(test.y)}`
                                legal.push(move)
                            }

                            //Allows for a second move to be caluclated IF it's on the starting rank && you're facing the right direction
                            if(occupant.color === 'w' && start.y === 2 && direction == 0 && distance === 1) continue to_edge
                            if(occupant.color === 'b' && start.y === (this.height - 2) && direction == 4 && distance === 1) continue to_edge

                            continue direction
                        }

                        if (test.occupant === '0') {
                            //Format Rg4
                            let moveString = `${occupant.type[0]}${convert_x(test.x)}${convert_y(test.y)}}`
                            legalStrings.push(moveString)
                            //Format e4e8
                            let move = `${convert_x(start.x)}${convert_y(start.y)}${convert_x(test.x)}${convert_y(test.y)}`
                            legal.push(move)
                        }

                        if(test.occupant !== '0'){
                            if (test.occupant.color != occupant.color){
                                //Format Rxg4
                                let moveString = `${occupant.type[0]}x${convert_x(test.x)}${convert_y(test.y)}`
                                legalStrings.push(moveString)
                                //Format e4e8
                                let move = `${convert_x(start.x)}${convert_y(start.y)}${convert_x(test.x)}${convert_y(test.y)}`
                                legal.push(move)
                            }
                            continue direction
                        }

                        if(occupant.type === "King")    continue direction
                        else                            continue to_edge
                    }
                }
            }
        }
        this.legal = legal
        this.legalStrings = legalStrings
    }

    search_KNIGHT(start){
        let results = []
        let occupant = start.occupant

        let distance = [
            this.sizeY - start.y - 1,            
            this.sizeX - start.x - 1,            
            start.y,            
            start.x,            
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

        for (let row of this.positon){
            for (let square of row) {








                
            }
        }

    }

    move(){

    }

    writeFEN(){
        
    }

    breakFEN(){
        let array = FEN.split(' ')
    
       //This seperates so that we only receive the pieces data from the FEN
        let position = array[0].split('/')
        let data = []

        for (let string of position){
            let row = ''
            for(let char of string){
                if(Number(char))
                {
                    row += ('-').repeat(Number(char))
                }
                else{
                    row.push(char)
                }
            }
            data.push(row)
        }

        const broken = {
            placement: data,
            turn: array[1],
            castling: array[2],
            enPassant: array[3],
            draw50: array[4],
            moveCount: array[5],
        }
        return broken
    }

    move(){

    }

}