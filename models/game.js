const { Board , Position } = require('./board.js')
const { Player } = require('./pieces.js')
const uuid = require('./uuid.js')
const dayjs = require('dayjs')


var options =  
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
    FEN : '',
    DefaultFEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
}

class Response {
    constructor(options, position, players, legal)
    {
        this.options = options
        this.position = position
        this.players = players
        this.legal = legal
    }
}

class Game {
    constructor(options){      
        this.options = options
        this.id = uuid()
        this.result = 'In progress'
        this.termination = ''
        this.date = dayjs()
        
        this.board = new Board(options)
        this.legal = []   

        this.players = []
        for (let i = 0; i < options.playersNumber; i++)
        { this.players.push(new Player(uuid(), options.playerColors[i], options.time, options.increment))}
    
        this.board.SEARCH_ALL()    
    }

    move(move){
        verifyMoves: for(let i = 0; i < this.board.legal.length; i++)
        {
            if (move === this.board.legal[i])
            {
                checkSquares: for (let j = 0; j < this.board.squares.length; j++)
                {
                    if (this.board.squares[j].piece !== 0)
                    {
                        
                        verifyMovePerPiece: for (let k = 0; k < this.board.squares[j].piece.moves.length; k++)
                        {
                            // console.log(this.board.squares[j].piece.moves[k])
                        }
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                    }
                }
            }
        }
    }

    respond(){
        return new Response(this.options, this.board.position, this.players, this.board.legal)
    }

    writeFEN(){
        const board  = this.board.squares
        let FEN = '';
        let digit = 0;
        for (let i = 0; i < board.length; i++)
        {
            const length = this.options.sizeX

            if ((i) % length == 0 && i !== 0)
            {
                if (digit)
                {
                    FEN += digit
                }
                digit = 0
                FEN += '/'
            }
            
            if (board[i].piece != '0')
            {
                let char = '';
                if (digit)
                {
                    char += `${digit}`                    
                }
                digit = 0;
                switch (board[i].piece.type)
                {
                    case "King":
                        char += "K"
                    break
                    case "Queen":
                        char += "Q"
                    break
                    case "Rook":
                        char += "R"
                    break
                    case "Bishop":
                        char += "B"
                    break
                    case "Knight":
                        char += "N"
                    break
                    case "Pawn":
                        char += "P"
                    break
                    default :
                    break                        
                }                    
                if (board[i].piece.color === "White")
                {
                    char = char.toLowerCase()
                }
                FEN += char;
            }
            else{
                digit++;
            }
        }
        if (digit)
        {
            FEN += `${digit}`
        }
        let object = this.board.position 
        FEN += ` ${object.turn} ${object.castling} ${object.enPassant} ${object.draw50} ${object.moveCount}`        
        this.options.FEN = FEN
    }
    // move(piece, position){

    // }    
}
   

module.exports = { Game, Response, options }
