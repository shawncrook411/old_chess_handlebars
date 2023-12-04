// class Player {
//     constructor(id, color, time, increment)
//     {
//         this.id = id
//         this.color = color
//         this.elo = 1200
//         this.time = time * 60
//         this.increment = increment
//         this.turn = 0 

//         if (this.color === "White") {
//             this.turn = 1
//         }
//     }
// } 

class Piece {
    constructor(color)
    {
        this.color = color
    }

    moves = []
   
}

class King extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "King"
        this.matrix = [1, 1, 1, 1, 1, 1 ,1 ,1]

    }
    castleK(){

    }
    castleQ(){

    }
    calculate(){
        
    }

}

class Queen extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "Queen"
        this.matrix = [1, 1, 1, 1, 1, 1 ,1 ,1]
    }
}

class Rook extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "Rook"
        this.matrix = [1, 0, 1, 0, 1, 0, 1, 0]
    }

}

class Bishop extends Piece {
    constructor(color, square)
    {
        super(color, square)
        this.type = "Bishop"
        this.matrix = [0, 1, 0, 1, 0, 1, 0, 1]
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

        if (color === "White")
        {
            this.matrix = [1, 1, 0, 0, 0, 0, 0, 1]
        }
        else
        {
            this.matrix = [0, 0, 0, 1, 1, 1, 0, 0]
        }       
    }
    promote() {

    }

    en_passant() {

    }

}

module.exports = { Piece, King, Queen, Rook, Bishop, Knight, Pawn } 

