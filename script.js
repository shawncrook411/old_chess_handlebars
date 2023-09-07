var createColumn = document.createElement("div");
var createSquare = document.createElement("div");
var boardState = document.getElementById("board_border");
var board_size;
var columnArray = ["a", "b", "c", "d", "e", "f", "g", "h"];

//Piece type
// 0 = rook
// 1 = knight
// 2 = bishop
// 3 = queen
// 4 = king
// 5 = pawn


var createBoard = function (board_size){
    for (let i = 0; i < board_size; i++)
    {
            var x = document.createElement("div")
            x.setAttribute("class", "column")
                
                for (let j = 0; j < board_size; j++)
                {
                    var y = document.createElement("div");
                    y.setAttribute("class", "square");

                    if (i > 7)
                    {
                        y.setAttribute("id", (i+1) + ":" + (j+1));
                        x.appendChild(y);
                    }
                    else
                    {
                        y.setAttribute("id", columnArray[i] + (j+1))
                        x.appendChild(y);
                    }
                }
            boardState.appendChild(x);
    }
}
var setPieces = function(color, type){
    let y = [];    

    if (type === 0)
    {       
        for(let i = 0; i < 5; i++)
        {
            var x = 
            {
                id: i * color,
                piece_type: i,
                color: color,
                column: columnArray[i],
                row: 4.5 - (color * 3.5)
            }            
            y.push(x);
        }      

        for (let i = 0; i < 3; i++)
        {
            var x =
            {
                id: (i+5) * color,
                piece_type: 2 - i,
                color: color,
                column: columnArray[i+5],
                row: 4.5 - (color * 3.5)
            }
            y.push(x);
        }

        for (let i = 0; i < 8; i++)
        {
            var x =
            {
                id: (i+8) * color,
                piece_type: 5,
                color: color,
                column: columnArray[i],
                row: 4.5 - (color * 2.5)
            }
            y.push(x);
        }
        return y;
    }
}

createBoard(8);

let player1 = setPieces (1, 0);
let player2 = setPieces (-1, 0);

console.log(player1);
console.log(player2);

