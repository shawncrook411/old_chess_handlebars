class Player {
    constructor(color, set, time, increment)
    {
        this.color = color
        this.set = set
        this.pieces = []
        this.time = time
        this.increment = increment
        this.turn = 0

        if (this.color === "White") {
            this.turn = 1
        }
    }
}

class Piece {
    constructor(color)
    {
        this.color = color
        this.square = ''
    }

    moves = []

    transform(square){
        this.square = square
    }

    capture(square){
        search(board)
        {
            for (squares in board.squares)
            {
                if (board.squares.x && board.squares.y === square)
                {

                }
            }
        }
        this.transform(square)
    }

    render(){

    }
}

class King extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "King"
    }
    castle(){

    }

}

class Queen extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "Queen"
    }
}

class Rook extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "Rook"
    }

}

class Bishop extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "Bishop"
    }

}

class Knight extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "Knight"
    }

}

class Pawn extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.moved = 0
        this.type = "Pawn"
    }
    promote() {

    }

    en_passant() {

    }

}

module.exports = { Player, Piece, King, Queen, Rook, Bishop, Knight, Pawn } 

