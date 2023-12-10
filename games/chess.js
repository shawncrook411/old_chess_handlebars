var convert_x = function(x) {            return String.fromCharCode(x + 97) }  //Used for converting x, y coordinates to the chess grid ex: 0, 3 -> A4
var convert_y = function(y) {            return (y + 1 ) }                     //Used for converting x, y coordinates to the chess grid ex: 0, 3 -> A4
var convert_square = function (square) { return `${String.fromCharCode(square.x + 97)}${square.y + 1}`}

class Move{ //May have special properties. 1 for en Passant, 2 for Castling, 3 for Promotion
    constructor(string, command, start, end){
        this.string = string
        this.command = command
        this.start = start
        this.end = end
        //start and end = {x: x, y: y}
    }
}

class Square{
    constructor(x, y, occupant){
        this.x = x,
        this.y = y,
        this.occupant = occupant
        this.id = convert_square({x: x, y: y})
    }}

class Piece{
    constructor(color, type){
        this.color = color
        this.type = type
        
        switch(type){
            case "Pawn", 'P':
                if(color === 'w')   this.matrix = [1, 1, 0, 0, 0, 0, 0, 1]
                else                this.matrix = [0, 0, 0, 1, 1, 1, 0, 0]
                break            
            case "King", 'K':
                this.matrix = [1, 1, 1, 1, 1, 1 ,1 ,1]
                break
            case "Queen", 'Q':
                this.matrix = [1, 1, 1, 1, 1, 1 ,1 ,1]
                break
            case "Rook", 'R':
                this.matrix = [1, 0, 1, 0, 1, 0, 1, 0]
                break
            case "Knight", 'N':
                this.matrix = [0, 0, 0, 0, 0, 0, 0, 0]
                break
            case "Bishop", 'B':
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
    draw50: 0,
    target: '-',
    castling: 'KQkq'
}

class Chess_Game {
    constructor(options){
        this.id = options.id
        this.FEN = options.FEN
        this.legal = []
        this.player_1 = options.player_1
        this.player_2 = options.player_2
        this.player_1_time = options.player_1_time
        this.player_2_time = options.player_2_time
        this.promote = 'Q'
        this.variant = options.variant
        this.time = options.time
        this.inc = options.inc
        this.bonus = options.bonus
        this.width = options.width
        this.height = options.height
        this.status = options.status
        this.turn = options.turn
        this.castling = options.castling
        this.moves = options.moves
        this.draw50 = options.draw50
        this.target = options.target
        this.result = options.result
        this.termination = options.termination
        this.opening = options.opening
        this.board = []

        this.initialize()
    }

    initialize(){
        const broken = this.readFEN()
        newRow: for (let y = 0; y < this.height; y++){
            let row = []
            newSquare: for (let x = 0; x < this.width; x++){

                let occupant = broken.placement[y][x]
                if (occupant === '-') occupant = '0'
                else {
                    if(occupant === occupant.toUpperCase()){
                        occupant = new Piece('w', occupant.toUpperCase() )
                    }
                    else{
                        occupant = new Piece('b', occupant.toUpperCase() )
                    }
                }
                row.push( new Square(x, y, occupant))
            }
            this.board.push(row)
        }
        this.search()
    }    

    table(){
        let array = []
        for(let row of this.board)
        {
            const mappedRow = row.map(square => { 
                if (square.occupant === '0') return ' '
                else{
                    if (square.occupant.color === 'b') return square.occupant.type.toLowerCase()
                    else return square.occupant.type
                }
            })
            array.splice(0, 0, mappedRow)
        }
        console.table(array)
        // console.table(this.legal)
        return array
    }

    legals(){
        console.table(this.legal)
    }
    
    search(){
        let i = 0 
        let legal = []
        
        checkRowStart: for (let row of this.board){
            checkSquareStart: for (let start of row) {   
                i++
                let occupant = start.occupant             

                //If unoccupied, can't move
                if (occupant === '0') continue checkSquareStart                

                //If it's not that pieces' color's turn, can't move
                if (occupant.color !== this.turn) continue checkSquareStart

                if (occupant.type === 'N')
                {
                    let results = this.search_KNIGHT(start)                  
                    results.forEach(move => legal.push(move))                  
                    continue checkSquareStart
                }

                //Calculates if Castling is legal
                //Later must add support for custom castling in Chess960
                if(occupant.type === 'K'){
                    if(start.x === 4 && this.variant === 1)
                    {
                        if(occupant.color === 'w' && start.y === 0){
                            if(this.castling.includes('K')){
                                const check1 = this.board[0][start.x + 1]
                                const check2 = this.board[0][start.x + 2]
                                if(check1.occupant === '0' && check2.occupant === '0')
                                {
                                    let output = new Move('O-O', `${convert_square(start)}${convert_square(check2)}`, {x: start.x, y: 0}, {x: start.x + 2, y: 0})
                                    output.special = 'Castling'
                                    output.rook = {x: start.x + 3, y: 0}
                                    legal.push(output)
                                }
                            }
                            if(this.castling.includes('Q')){
                                const check1 = this.board[0][start.x - 1]
                                const check2 = this.board[0][start.x - 2]
                                const check3 = this.board[0][start.x - 3]
                                if(check1.occupant === '0' && check2.occupant === '0' && check3.occupant === '0')
                                {
                                    let output = new Move('O-O-O', `${convert_square(start)}${convert_square(check2)}`, {x: start.x, y: 0}, {x: start.x - 2, y: 0})
                                    output.special = 'Castling'
                                    output.rook = {x: start.x -4, y: 0}
                                    legal.push(output)
                                }
                            }
                        }
                        else if (occupant.color === 'b' && start.y === (this.height -1 )){
                            if(this.castling.includes('k')){
                                const check1 = this.board[this.height - 1][start.x + 1]
                                const check2 = this.board[this.height - 1][start.x + 2]
                                if(check1.occupant === '0' && check2.occupant === '0')
                                {
                                    let output = new Move('O-O', `${convert_square(start)}${convert_square(check2)}`, {x: start.x, y: this.height - 1}, {x: start.x + 2, y: this.height - 1})
                                    output.special = 'Castling'
                                    output.rook = {x: start.x + 3, y: this.height - 1}
                                    legal.push(output)
                                }
                            }
                            if(this.castling.includes('q')){
                                const check1 = this.board[this.height - 1][start.x - 1]
                                const check2 = this.board[this.height - 1][start.x - 2]
                                const check3 = this.board[this.height - 1][start.x - 3]
                                if(check1.occupant === '0' && check2.occupant === '0' && check3.occupant === '0')
                                {
                                    let output = new Move('O-O-O', `${convert_square(start)}${convert_square(check2)}`, {x: start.x, y: this.height - 1}, {x: start.x - 2, y: this.height - 1})
                                    output.special = 'Castling'
                                    output.rook = {x: start.x -4, y: this.height - 1}
                                    legal.push(output)
                                }
                            }
                        }                        
                    }
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
                        

                        let next_x = start.x + (distance * master[direction].x)
                        let next_y = start.y + (distance * master[direction].y)

                        let test = this.board[next_y][next_x]
                        
                        if(occupant.type === 'P'){
                            //If in diagnol direction, the test square is occupied and can be captured
                            if(direction % 2 && test.occupant !== '0' && test.occupant.color !== occupant.color){

                                //Format exf4
                                let moveString = `${convert_x(start.x)}x${convert_square(test)}`
                                //Format e2e4
                                let move = `${convert_square(start)}${convert_square(test)}`

                                let output = new Move(moveString, move, {x: start.x, y: start.y}, {x: test.x, y: test.y})

                                if(test.y === this.height - 1 || test.y === 0) output.special = 'Promotion'

                                legal.push(output)
                                continue direction
                            }

                            //Check for enPassant target
                            if(this.target !== '-')
                            {
                                if(this.target === `${convert_square(test)}`)
                                {
                                    //Format exf4
                                    let moveString = `${convert_x(start.x)}x${convert_square(test)}`
                                    //Format e2e4
                                    let move = `${convert_square(start)}${convert_square(test)}`

                                    let output = new Move(moveString, move, {x: start.x, y: start.y}, {x: test.x, y: test.y})
                                    output.special = 'enPassant'
                                    legal.push(output)
                                    continue direction
                                }
                            }

                            if(direction % 2 === 0 && test.occupant === '0'){
                                //Format f4
                                let moveString = `${convert_square(test)}`
                                //Format e2e4
                                let move = `${convert_square(start)}${convert_square(test)}`

                                let output = new Move(moveString, move, {x: start.x, y: start.y}, {x: test.x, y: test.y})
                                if(test.y === this.height - 1 || test.y === 0) output.special = 'Promotion'

                                legal.push(output)                              
                            }

                            //Allows for a second move to be caluclated IF it's on the starting rank && you're facing the right direction
                            if(occupant.color === 'w' && start.y === 1 && direction == 0 && distance === 1) continue to_edge
                            if(occupant.color === 'b' && start.y === (this.height - 2) && direction == 4 && distance === 1) continue to_edge

                            continue direction
                        }

                        if (test.occupant === '0') {
                            //Format Rg4                            
                            let moveString = `${occupant.type[0]}${convert_square(test)}`
                            
                            //Format e4e8
                            let move = `${convert_square(start)}${convert_square(test)}`

                            let output = new Move(moveString, move, {x: start.x, y: start.y}, {x: test.x, y: test.y})
                            legal.push(output)                          
                        }

                        if(test.occupant !== '0'){                 
                            if (test.occupant.color !== occupant.color){
                                //Format Rxg4
                                let moveString = `${occupant.type[0]}x${convert_square(test)}`
                                //Format e4e8
                                let move = `${convert_square(start)}${convert_square(test)}`

                                let output = new Move(moveString, move, {x: start.x, y: start.y}, {x: test.x, y: test.y})
                                legal.push(output)
                            }
                            continue direction
                        }

                        if(occupant.type === "K")    continue direction
                        else                         continue to_edge
                    }
                }
            }
        }
        this.legal = legal
    }

    search_KNIGHT(start){        
        let moves = []
        let moveStrings = []
        let occupant = start.occupant        
        
        let master = [
            {x: 1, y: 2},
            {x: 2, y: 1},
            {x: 2, y: -1},
            {x: 1, y: -2},
            {x: -1, y: -2},
            {x: -2, y: -1},
            {x: -2, y: 1},
            {x: -1, y: 2}
        ]

        for (let direction = 0; direction < 8; direction ++)
        {
            let matrix = master[direction]

            let test = { x: start.x + matrix.x, y: start.y + matrix.y}             

            if( test.x >= 0 && test.x < this.width &&
                test.y >= 0 && test.y < this.height)
            {              
                let reference = this.board[test.y][test.x]

                if (reference.occupant === '0'){
                    let moveString = `N${convert_square(test)}`
                    moveStrings.push(moveString)

                    let move = `${convert_square(start)}${convert_square(test)}`

                    let output = new Move(moveString, move, {x: start.x, y: start.y}, {x: test.x, y: test.y})
                    moves.push(output)
                }

                if (reference.occupant !== '0' && reference.occupant.color !== occupant.color)
                {
                    let moveString = `Nx${convert_square(test)}`
                    moveStrings.push(moveString)

                    let move = `${convert_square(start)}${convert_square(test)}`

                    let output = new Move(moveString, move, {x: start.x, y: start.y}, {x: test.x, y: test.y})
                    moves.push(output)
                }
            }
        }        
        return moves
    }
    
    writeFEN(){
        let FEN = ''       

        for (let row of this.board){
            let newRow = ''
            let digit = 0
            for (let square of row){                
                if (square.occupant !== '0')
                {
                    if (digit) newRow += `${digit}`           
                    digit = 0

                    let char = square.occupant.type
                    if (square.occupant.color === 'b') char = char.toLowerCase()
                    newRow += char
                }
                else digit++
            }
            if (digit) newRow += digit
            newRow += '/'
            FEN = newRow + FEN           
        }

        if (FEN[ FEN.length - 1] === '/') FEN = FEN.slice(0, -1) //Removes the last trailing '/'

        FEN += ` ${this.turn} ${this.castling} ${this.target} ${this.draw50} ${this.moves}`

        this.FEN = FEN
        return FEN    
    }

    readFEN(){
        
        let FEN = this.FEN
        let array = FEN.split(' ')
    
       //This seperates so that we only receive the pieces data from the FEN
        let position = array[0].split('/')
        let data = []

        for (let string of position){
            let row = []
            for(let char of string){
                if(Number(char))
                {
                    row += ('-').repeat(Number(char))
                }
                else{
                    row += (char)
                }
            }
            data.splice(0, 0, row)
        }        

        const broken = {
            placement: data,
            turn: array[1],
            castling: array[2],
            target: array[3],
            draw50: array[4],
            moveCount: array[5],
        }
       
        this.turn = broken.turn
        this.castling = broken.castling
        this.target = broken.target
        this.draw50 = broken.draw50
        this.moves = broken.moveCount

        return broken
    }
    
    submit(input){

        switch(input[input.length -1])
        {
            case '#', '!', '=', '+':
                input = input.slice(0, -1)
                break
        }
        let success = false

        this.legal.forEach(move => {
            if(move.string === input){
                this.move(move)
                success = true            
            }
            else if (move.command === input){
                this.move(move)
                success = true                
            }
        })

        if(!success) console.log(`Invalid Move: ${input}`)
    }    

    move(move){   
        const start = move.start
        const end = move.end
        const special = move.special

        const oldSquare = this.board[start.y][start.x]
        const newSquare = this.board[end.y][end.x]
        const piece = oldSquare.occupant

        switch(special){
            case 'enPassant':
                let captureSquare
                if(piece.color === 'w') captureSquare = this.board[end.y - 1][end.x]
                if(piece.color === 'b') captureSquare = this.board[end.y + 1][end.x]
                if(captureSquare)       captureSquare.occupant = '0'           
                break
            case 'Castling':
                let rookNew

                if(move.string === 'O-O') {
                    rookNew = this.board[start.y][start.x + 1]
                }
                if(move.string === 'O-O-O'){
                    rookNew = this.board[start.y][start.x - 1]
                }
                const rookOld = this.board[move.rook.y][move.rook.x]

                if(rookOld.occupant.type === 'R'){
                    const rook = rookOld.occupant
                    rookNew.occupant = rook
                    rookOld.occupant = '0' 
                }
                break
            case 'Promotion':
                piece.type = this.promote
                break    
        }

        newSquare.occupant = piece
        oldSquare.occupant = '0'

        //Target is always reset, but if a pawn moves twice it will be set to one square behind it
        this.target = '-'
        if(piece.type === 'P' && start.y === end.y + 2) this.target = `${convert_x(end.x)}${convert_y(end.y + 1)}`
        if(piece.type === 'P' && start.y === end.y - 2) this.target = `${convert_x(end.x)}${convert_y(end.y - 1)}`

        if (this.turn === 'w') {
            this.turn = 'b'
        } //Only increase move count after Black's turn
        else if (this.turn === 'b') {
            this.turn = 'w'
            this.moves++
        }       

        this.writeFEN()
        this.readFEN()
        this.search()
    }
}

module.exports = { Chess_Game, Default }