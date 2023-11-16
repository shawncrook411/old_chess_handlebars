class Square {
    constructor(x, y)
    {
        let column = String.fromCharCode(x + 65)
        this.positon = 
        {
            column : column,
            row : y,
        }
        this.piece = []
    }
}

class Board {
    constructor(sizeX, sizeY, playersCount)
    {
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.playersCount = playersCount
        let squares = []
        
        for (let i = 0; i < this.sizeY; i++)
        {
            for (let j = 1; j <= this.sizeX; j++)
            {   
                let object = new Square(i, j)
                squares.push(object)
            }
        }
        this.squares = squares
    }
}


module.exports = { Square, Board}