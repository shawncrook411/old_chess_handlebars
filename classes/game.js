const { Board , Position } = require('./board.js')
const { Player } = require('./pieces.js')
const uuid = require('../helpers/uuid.js')
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

        let legalStrings = []
        for(let i = 0; i < legal.length; i++)
        {
            legalStrings.push(legal[i].string)
        }
        this.legal = legalStrings
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

    submit(string){
        this.board.MOVE(string)

        let turn = this.board.position.turn
        let color;
        if (turn.toLowerCase() === 'w') {color = "White"}
        if (turn.toLowerCase() === 'b') {color = "Black"}


        console.log (`${color} moved: ${string}`)

        if (color === "White") { this.board.position.turn = 'b'}
        if (color === "Black") { this.board.position.turn = 'w'}

        this.writeFEN()
        this.board.SEARCH_ALL()
        this.board.position = new Position(this.options.FEN)
    }

    respond(){
        return new Response(this.options, this.board.position, this.players, this.board.legal)
    }

    writeFEN(){
        const board  = this.board.squares
        let row = '';
        let FEN = '';

        let digit = 0;
        for (let i = 1; i <= board.length; i++)
        {
            const length = this.options.sizeX            
            
            if (board[i-1].piece != '0')
            {
                let char = '';
                if (digit)
                {
                    row += `${digit}`                    
                }
                digit = 0;
                switch (board[i-1].piece.type)
                {
                    case "King":
                        char = "K"
                    break
                    case "Queen":
                        char = "Q"
                    break
                    case "Rook":
                        char = "R"
                    break
                    case "Bishop":
                        char = "B"
                    break
                    case "Knight":
                        char = "N"
                    break
                    case "Pawn":
                        char = "P"
                    break
                    default :
                    break                        
                }                    
                if (board[i-1].piece.color === "Black")
                {
                    char = char.toLowerCase()
                }
                row += char;
            }
            else{
                digit++;
            }

            if ((i) % length == 0)
            {
                if (digit)
                {
                    row += `${digit}`
                    digit = 0
                }

                row +='/'                
                FEN = row + FEN
                row = ''
            }
        }
        if (FEN[ FEN.length - 1] === '/')
        {FEN = FEN.slice(0, -1)}
        
        let object = this.board.position

        FEN += ` ${object.turn} ${object.castling} ${object.enPassant} ${object.draw50} ${object.moveCount}`        
        this.options.FEN = FEN
    }
    // move(piece, position){

    // }    
}
   

module.exports = { Game, Response, options }
