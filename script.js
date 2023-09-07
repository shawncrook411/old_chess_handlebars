var createColumn = document.createElement("div");
var createSquare = document.createElement("div");
var boardState = document.getElementById("board_border");
var board_size;
var columnArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
var pieceType = ["rook", "knight", "bishop", "queen", "king", "pawn"]

var createBoard = function (board_size){
    for (let i = 0; i < board_size; i++)
    {
            var x = document.createElement("div")
            x.setAttribute("class", "column")
                
                for (let j = 0; j < board_size; j++)
                {
                    var y = document.createElement("div");
                    if (i > 7)
                    {
                        y.setAttribute("id", (i+1) + ":" + (j+1));                        
                        
                    }
                    else
                    {
                        y.setAttribute("id", columnArray[i] + (j+1))
                          
                    }                    
                    if ((j + i) % 2 == 0 ){
                        y.setAttribute("class", " square primary_square")
                    }
                    else{
                        y.setAttribute("class", "square secondary_square")
                    }
                    x.appendChild(y);
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
                id: (i + 1) * color,
                piece_type: pieceType[i],
                color: color,
                position_column: columnArray[i],
                position_row: 4.5 - (color * 3.5)
            }            
            y.push(x);
        }      

        for (let i = 0; i < 3; i++)
        {
            var x =
            {
                id: (i+6) * color,
                piece_type: pieceType[2 - i],
                color: color,
                position_column: columnArray[i+5],
                position_row: 4.5 - (color * 3.5)
            }
            y.push(x);
        }

        for (let i = 0; i < 8; i++)
        {
            var x =
            {
                id: (i+9) * color,
                piece_type: pieceType[5],
                color: color,
                position_column: columnArray[i],
                position_row: 4.5 - (color * 2.5)
            }
            y.push(x);
        }
        return y;
    }
}

var printPosition = function (x, y) {
    for(i = 0; i < x.length; i++){
        console.log(x[i]);
    }
    for(i = 0; i < y.length; i++){
        console.log(y[i]);
    }
}

var printPice

var printPieceByArray = function (x) {   
    let z = "Blank";
    if (x.color == 1)
        {z = "White"}
    if (x.color == -1)
        {z = "Black"}
    console.log("Array: " + x);
    console.log("ID: " + x.id);
    console.log("Position: " + x.position_column+x.position_row);
    console.log("Type: " + z + " " + x.piece_type);
}

var printPieceByPosition = function (x, y) {
    
    for(let i = 0; i < 16; i++)
        {
            //console.log("Testing: " + player1[i].position_column + player1[i].position_row);
            if (player1[i].position_column == x && player1[i].position_row == y) {         
                printPieceByArray(player1[i]);
                return;
            }
            else if (player2[i].position_column == x && player2[i].position_row == y) { 
                printPieceByArray(player2[i]);
                return;
            }
        }
    console.log("Square is unoccupied");
    return;
}

var checkOccupied = function (x , y) {
    let z = 0;
    for (let i = 0; i < 16; i++) {
        
        if (player1[i].position_column == x && player1[i].position_row == y) {         
            z = 1;            
            return z;
        }
        else if (player2[i].position_column == x && player2[i].position_row == y) { 
            z = -1;
            return z;
        }
    }
    return z;
}

let checkObstruction = function (a, b, c, g, y) {
    let x;
    let furthest_square;
    let z = 0;

    for (let i = 0; i < 8; i ++)
    {
        if (columnArray[i] == g) {
        x = i;
        }
    }

    for(let i = 0; i < 8; i++)
    {
        z = checkOccupied(columnArray[x + (b*(i + 1))] , (y + (a*(i + 1)))) // y + i  == 6
        let h = 0;
        if (z == c*-1) {
            h = 1;
        }            
        if (z != 0)
        {
        furthest_square = [columnArray[x + (b*(i + h))], (y + (a*(i + h)))]
        return furthest_square;
        }
    }        
    return z;
}


var displayBoard = function (){

    for(let i = 0; i<16; i++)
    {   

        let id = "./assets/images/black_" + player2[i].piece_type +".png"        
     
        var x = document.createElement("a");
        var y = document.getElementById(player2[i].position_column + player2[i].position_row)
        y.appendChild(x)
        var z = document.createElement("img");
        z.setAttribute("src", id)
        x.appendChild(z);
    }

    for(let i = 0; i<16; i++)
    {
        id = "./assets/images/white_" + player1[i].piece_type +".png"        
     
        var x = document.createElement("a");
        var y = document.getElementById(player1[i].position_column + player1[i].position_row)
        y.appendChild(x)
        var z = document.createElement("img");
        z.setAttribute("src", id)
        x.appendChild(z);
    }
}

// //if (a == 2) // Horizontal

// //if (a == 3) // NE / SW Diagonal

// if (a == 4) // NW / SE Diagonal
// return;



createBoard(8);
let player1 = setPieces (1, 0);
let player2 = setPieces (-1, 0);
//printPosition(player1, player2);
//printPieceByID(player1[0]);
//printPieceByPosition("a", 7);
//printPieceByArray(player1[3]);
//console.log(checkObstruction(1, 0, "a", 2));

console.log(checkObstruction(-1, -1, -1, "d", 8));
displayBoard();

