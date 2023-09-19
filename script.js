var createColumn = document.createElement("div");
var createSquare = document.createElement("div");
var boardState = document.getElementById("board_border");
var board_size;
var columnArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var pieceType = ["R", "N", "B", "Q", "K", "P"];
var moves = [""];
var move_count = 1;
var gameTime = 10; //In tenths of a second
var playerMove = 1;
var whiteStartMove = 0;
var blackStartMove = 0;
var storagePiece; 



//Creates Array of preferences for customization
var preferences = [];
var preferencePiecesOptions = ["pixel", "cburnett", "merida", "alpha", "pirouetti", "chessnut", "reillycraig", "companion", "riohacha", "kosal", "leipzig", "fantasy", "spatial", "celtic", "california", "caliente", "pixel", "maestro", "fresca", "cardinal", "gioco", "tatiana", "staunty", "governor", "dubrovny", "icpieces", "mpchess", "kiwen-suwi", "horsey", "anarcandy", "shapes", "letter", "disguised"];

preferences[0] = preferencePiecesOptions[Math.floor(Math.random() * 33)];
preferences[0] = preferencePiecesOptions[0]; // Piece Type
preferences[1] = 8; // Board Size

board_size = preferences[1];


var createBoard = function (board_size){
    for (let i = 0; i < board_size; i++)
    {
            var x = document.createElement("div")
            x.setAttribute("class", "column")
                
                for (let j = 0; j < board_size; j++)
                {
                    var y = document.createElement("div");
                    if (i > 26)
                    {
                        y.setAttribute("id", "a" + (i+1) + (j+1));                        
                        
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

                    y.addEventListener("click", function (event){
                        
                        completeMove(event.target);
                    })

                    x.appendChild(y);
                }
            boardState.appendChild(x);
    }
}
var setPieces = function(color, type){
    let y = [];      
    magicNumbers = (board_size + 1) / 2       

    if (type === 0)
    {       
        for(let i = 0; i < 5; i++) // Creates one of each piece, in order, on the back rank per color
        {
            var x = 
            {
                id: (i + 1) * color,
                piece_type: pieceType[i],
                color: color,
                position_column: columnArray[i],
                position_row: magicNumbers - (color * (magicNumbers-1)) // Magic Numbers to force the pieces onto row 1 and 8 repsectively based on color 4.5 + 3.5 = 8 & 4.5 - 3.5 = 1

                
            }            
            y.push(x);
        }      

        for (let i = 0; i < 3; i++) // Creates an identical array of pieces descending. Creates the 2nd Bishop, Knight and Rook on the kingside
        {   
            let temporaryColumn = board_size - 3;
            var x =
            {
                id: (i+6) * color,
                piece_type: pieceType[2 - i],
                color: color,
                position_column: columnArray[i+temporaryColumn],
                position_row: magicNumbers - (color * (magicNumbers-1))
            }
            y.push(x);
        }

        for (let i = 0; i < board_size; i++) // Creates Black and White Pawns
        {
            var x =
            {
                id: (i+9) * color,
                piece_type: pieceType[5],
                color: color,
                position_column: columnArray[i],
                position_row: magicNumbers - (color * (magicNumbers-2)  ) // Magic Numbers to force the pieces onto row 2 and 7 repsectively based on color 4.5 + 2.5 = 7 & 4.5 - 2.5 = 2
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

//1 = North
//2 = NE
//3 = East
//4 = SE
//5 = South
//6 = SW
//7 = West
//8 = NW

let checkObstruction = function (a, b, c, columnChar, y) {
    let x;
    let furthest_square;
    let z = 0;
    let PM = [];

    //Converts Column Array into a number
    for (let i = 0; i < 8; i ++)
    {
        if (columnArray[i] == columnChar) {
        x = i;
        }
    }   

    for(let i = 0; i < board_size; i++)
    {
        let testSquareX = columnArray[x + (a*(i + 1))]
        let testSquareXarray = [x + (a*(i + 1))]
        let testSquareY = (y + (b*(i + 1)))
        let h = 0;

        if (testSquareXarray > board_size -1 || testSquareY > board_size || testSquareY <= 0 || testSquareXarray <= -1)
        {
           
        }
        else
        {
            z = checkOccupied(testSquareX, testSquareY) // y + i  == 6   

            if (z === 0)
            {
                testSquare = testSquareX + testSquareY;
                PM.push(testSquare);
            }
            
            if (z === c) {
                return PM;
            }

            if (z === c*-1) { // h == different color variable
                h = 1;           
                furthest_square = columnArray[x + (a*(i + h))] + (y + (b*(i + h)))
                
                if (h === 1)
                {
                PM.push(furthest_square);
                }
                
                return PM;
            }
        }
        
    }        
    return PM;
}

var whiteMove = function (piece, event){
   
    event.stopPropagation()
    
    console.log("White Start Move")
    
    blackStartMove = 0
    whiteStartMove = 1;
    storagePiece = piece 
    
}

var blackMove = function (piece, event){
   
    event.stopPropagation()
    
    console.log("Black Start Move")

    whiteStartMove = 0;
    
    blackStartMove = 1;
    storagePiece = piece
    
    
}


var completeMove = function (target) {
if (whiteStartMove != 0 || blackStartMove != 0)
    {
        if ((playerMove === 1 && whiteStartMove === 1) || (playerMove === -1 && blackStartMove ===1) )
        {
            id = target.id
            x = storagePiece.position_column
            y = storagePiece.position_row

            let newID = [];
            newID = id.split("");       

            possible = calculatePossibleMoves(storagePiece)

            console.log(possible)
            

            for (i = 0; i < possible.length; i++)
            {
                if(possible[i] === id)
                {
                
                    previousSquare = document.getElementById(x + y)
                
                
                    piece = previousSquare.children[0]
                    piece.remove()

                    storagePiece.position_column = newID[0]
                    storagePiece.position_row = parseInt(newID[1])
                    
                    console.log(player1)

                    console.log(storagePiece)
                    displayPiece(storagePiece);
                    storagePiece = '';    
                    
                    if (whiteStartMove === 1)
                        {playerMove = -1}
                    if (blackStartMove === 1)
                        {playerMove = 1}
                    
                    return;
                }
            }
        }
        whiteStartMove = 0
        blackStartMove = 0        
    }

    // if whiteStartMove = 0
    // {
    //     storagePiece
    // }
    // if blackStartMove = 0
    // {

    // }
}

var displayPiece = function (storagePiece){
    if (storagePiece.color === 1)
    {
        if (preferences[0] ==  "disguised")
            {
                id = "https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/" + preferences[0] + "/w.svg" 
            }
            else
            {
                id = "https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/" + preferences[0] + "/w" + storagePiece.piece_type +".svg" 
            }             
            
            var x = document.createElement("a");
            var y = document.getElementById(storagePiece.position_column + storagePiece.position_row)
            y.appendChild(x)
            var z = document.createElement("img");
            z.setAttribute("src", id)
            y.addEventListener("click", function (event){
                whiteMove(storagePiece, event);
            })
        
            x.appendChild(z);
    }
    if (storagePiece.color === -1)
    {      
        if (preferences[0] ==  "disguised")
        {
            id = "https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/" + preferences[0] + "/b.svg" 
        }
        else{
            id = "https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/" + preferences[0] + "/b" + storagePiece.piece_type +".svg" 
        }      
        var x = document.createElement("a");
        var y = document.getElementById(storagePiece.position_column + storagePiece.position_row)
        y.appendChild(x)
        var z = document.createElement("img");
        z.setAttribute("src", id)
        y.addEventListener("click", function (event){
            blackMove(storagePiece, event);
        })
        x.appendChild(z);
    }

}

var displayBoard = function (){     
    
    for(let i = 0; i< player1.length; i++)
    {

        if (preferences[0] ==  "disguised")
        {
            id = "https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/" + preferences[0] + "/w.svg" 
        }
        else
        {
            id = "https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/" + preferences[0] + "/w" + player1[i].piece_type +".svg" 
        }             
        
        var x = document.createElement("a");
        var y = document.getElementById(player1[i].position_column + player1[i].position_row)
        y.appendChild(x)
        var z = document.createElement("img");
        z.setAttribute("src", id)
        y.addEventListener("click", function (event){
            whiteMove(player1[i], event);
        })
    
        x.appendChild(z);
    }
    
    for(let i = 0; i < player2.length; i++)
    {         
       
        if (preferences[0] ==  "disguised")
        {
            id = "https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/" + preferences[0] + "/b.svg" 
        }
        else{
            id = "https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/" + preferences[0] + "/b" + player2[i].piece_type +".svg" 
        }      
        var x = document.createElement("a");
        var y = document.getElementById(player2[i].position_column + player2[i].position_row)
        y.appendChild(x)
        var z = document.createElement("img");
        z.setAttribute("src", id)
        y.addEventListener("click", function (event){
            blackMove(player2[i], event);
        })
    
        x.appendChild(z);
    }
}

let boardListener = document.querySelector("#board");   
let whiteClock = document.querySelector("#player1Clock");
let blackClock = document.querySelector("#player2Clock");

whiteClock.textContent = "00:00"
blackClock.textContent = "00:00"

var timerConvert = function (x) {

    minutes = x/600
    minutes = Math.floor(minutes)    

    seconds = (x%600)/10
    seconds = Math.floor(seconds)

    if (seconds < 10){
        seconds = "0" + seconds;
    }

    deciSeconds = x%10
    return (minutes + ":" + seconds + "." + deciSeconds);
}

var startTimer = function setTime(gameTime) {
    let whiteSecondsLeft = gameTime;
    let blackSecondsLeft = gameTime;

    var Timer = setInterval(function() {


        if (playerMove === 1){
            whiteSecondsLeft--;
        }
        else{
            blackSecondsLeft--;
        }

        let w = timerConvert(whiteSecondsLeft);
        let b = timerConvert(blackSecondsLeft);

        whiteClock.textContent = w;
        blackClock.textContent = b; 

        
    
        if(whiteSecondsLeft <= 0) 
        {   
            whiteClock.textContent = "00:00.0";
            clearInterval(Timer) 
            gameTimeOut(-1);
        }

        if(blackSecondsLeft <= 0) 
        {   
            blackClock.textContent = "00:00.0";
            clearInterval(Timer)  
            gameTimeOut(1);
        }        

    }, 100);
}

var gameTimeOut = function(result) {

    whiteClock.textContent = "00:00";
    blackClock.textContent = "00:00"; 

    if (result === 1)
    {
        blackClock.textContent = "00:00.0";
        
        window.alert("White has won");
    }

    if (result === -1)
    {  
        whiteClock.textContent = "00:00.0";

        window.alert("Black has won");
    }

    if (result === 0)
    {
        window.alert("Game is drawn");
    }
}

var calculatePossibleMoves = function (piece){

    let possibleMoves = [];    
    let N = checkObstruction(  0,  1, piece.color, piece.position_column, piece.position_row)
    let NE = checkObstruction( 1,  1, piece.color, piece.position_column, piece.position_row)
    let E = checkObstruction(  1,  0, piece.color, piece.position_column, piece.position_row)
    let SE = checkObstruction( 1, -1, piece.color, piece.position_column, piece.position_row)
    let S = checkObstruction(  0, -1, piece.color, piece.position_column, piece.position_row)
    let SW = checkObstruction(-1, -1, piece.color, piece.position_column, piece.position_row)
    let W = checkObstruction( -1,  0, piece.color, piece.position_column, piece.position_row)
    let NW = checkObstruction(-1,  1, piece.color, piece.position_column, piece.position_row)    

    if (piece.piece_type === "R" || piece.piece_type === "Q")
    {
        for(let i = 0; i < N.length; i++)
        {possibleMoves.push(N[i])}
        
        for(let i = 0; i < E.length; i++)
        {possibleMoves.push(E[i])}

        for(let i = 0; i < S.length; i++)
        {possibleMoves.push(S[i])}

        for(let i = 0; i < W.length; i++)
        {possibleMoves.push(W[i])}
    }

    if (piece.piece_type === "N")
    {
        for (i = 0; i < board_size; i++)
        {
            if(piece.position_column === columnArray[i])
            {
                convertE = columnArray[i+1]
                convertW = columnArray[i-1]
                convert2E = columnArray[i+2]
                convert2W = columnArray[i-2]
            } 
        }      

        if (piece.color != (checkOccupied(convertE, piece.position_row + 2)))
        {
            if (piece.position_column != "h" && piece.position_row + 2 <= board_size)
            {
                addSquare = (convertE + (piece.position_row + 2))
                possibleMoves.push(addSquare);
            }
        }

        if (piece.color != (checkOccupied(convert2E, piece.position_row + 1)))
        {
            if (piece.position_column != "h" && piece.position_column != "g" && piece.position_row + 1 <= board_size)
            {  
             
                addSquare = (convert2E + (piece.position_row + 1))
                possibleMoves.push(addSquare);
            }
        }

        if (piece.color != (checkOccupied(convert2E, piece.position_row - 1)))
        {
            if (piece.position_column != "h" && piece.position_column != "g" && piece.position_row - 1 > 0)
            {
                addSquare = (convert2E + (piece.position_row -1))
                possibleMoves.push(addSquare);
            }
        }
        if (piece.color != (checkOccupied(convertE, piece.position_row - 2)))
        {
            if (piece.posiion_column != "h" && piece.position_row - 2 > 0)
            {
                addSquare = (convertE + (piece.position_row -2))
                possibleMoves.push(addSquare);
            }
        }
        
        if (piece.color != (checkOccupied(convertW, piece.position_row - 2)))
        {
            if (piece.position_column != "a" && piece.position_row - 2 > 0)
            {
                addSquare = (convertW + (piece.position_row - 2))
                possibleMoves.push(addSquare);
            }
        }

        if (piece.color != (checkOccupied(convert2W, piece.position_row - 1)))
        {
            if (piece.position_column != "a" && piece.position_column != "b" && piece.position_row -1 > 0)
            {
                addSquare = (convert2W + (piece.position_row -1))
                possibleMoves.push(addSquare);
            }
        }

        if (piece.color != (checkOccupied(convert2W, piece.position_row + 1)))
        {
            if (piece.position_column != "a" && piece.position_column != "b" && piece.position_row + 1 <= board_size)
            {
                addSquare = (convert2W + (piece.position_row + 1))
                possibleMoves.push(addSquare);
            }
        }

        if (piece.color != (checkOccupied(convertW, piece.position_row + 2)))
        {
            if (piece.position_column != "a" && piece.position_row + 2 <= board_size)
            {
                addSquare = (convertW + (piece.position_row + 2))
                possibleMoves.push(addSquare);
            }
        }        
          
    }

     if (piece.piece_type === "B" || piece.piece_type === "Q")
    {
        for(let i = 0; i < NE.length; i++)
        {possibleMoves.push(NE[i])}
        
        for(let i = 0; i < SE.length; i++)
        {possibleMoves.push(SE[i])}
        
        for(let i = 0; i < SW.length; i++)
        {possibleMoves.push(SW[i])}
            
        for(let i = 0; i < NW.length; i++)
        {possibleMoves.push(NW[i])}
    }

    if (piece.piece_type === "K")
    {                
        if(N.length != 0)
        {possibleMoves.push(N[0])}

        if( NE.length != 0)
        {possibleMoves.push(NE[0])} 

        if( E.length != 0)
        {possibleMoves.push(E[0])} 

        if( SE.length != 0)
        {possibleMoves.push(SE[0])} 

        if( S.length != 0)
        {possibleMoves.push(S[0])} 

        if( SW.length != 0)
        {possibleMoves.push(SW[0])}

        if( W.length != 0)
        {possibleMoves.push(W[0])}

        if(NW.length != 0)
        {possibleMoves.push(NW[0])}      
    }

    for (i = 0; i < board_size; i++)
    {
        if(piece.position_column === columnArray[i])
        {
            convertE = columnArray[i+1]
            convertW = columnArray[i-1]
        }        
    }

    if (piece.piece_type === "P" && piece.color === 1)
    {
        if(checkOccupied(piece.position_column, piece.position_row + 1) === 0) // if Square above it is unoccupied, may move forward
        {possibleMoves.push(N[0])

            if (piece.position_row === 2 && checkOccupied(piece.position_column, piece.position_row + 2) === 0) // Allows White Pawns to move two squares up if on second rank
            {possibleMoves.push(N[1])}
        }      

        if(checkOccupied(convertW, piece.position_row + 1) === -1)// Allows Black pawns to capture NW
        {possibleMoves.push(NW[0])}


        if(checkOccupied(convertE, piece.position_row + 1) === -1)// Allows Black pawns to capture NE
        {possibleMoves.push(NE[0])}


    }

    if (piece.piece_type === "P" && piece.color === -1)
    {
        if(checkOccupied(piece.position_column, piece.position_row - 1) === 0) // if Square below it is unoccupied, may move forward
        {possibleMoves.push(S[0]) 

            if (piece.position_row === board_size - 1 && checkOccupied(piece.position_column, piece.position_row - 2) === 0) // Allows Black Pawns to move two squares up if on second rank && both squares are unoccupied
            {possibleMoves.push(S[1])}
        }    

        if(checkOccupied(convertW, (piece.position_row - 1)) === 1) // Allows Black pawns to capture SW
        {possibleMoves.push(SW[0])}


        if(checkOccupied(convertE, (piece.position_row - 1)) === 1) // Allows Black pawns to capture SE
        {possibleMoves.push(SE[0])}

    }
         
    return possibleMoves;
}

// var updateMoves();
// {
//     var list = document.getElementById(moveslist);
//     list.push(moves[move_count])
// }

startButton = document.getElementById("start-game")

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("start game")
    startTimer(gameTime)}
);

createBoard(preferences[1]);
let player1 = setPieces (1, 0);
let player2 = setPieces (-1, 0);
// printPosition(player1, player2);
// printPieceByArray(player1[3]);
// console.log(checkObstruction(1, 0, 1, "a", 3));
displayBoard();




let testPiece =
    {
        id: 100,
        piece_type: "B",
        color: 1,
        position_column: "f",
        position_row: 1                
    }  

calculatePossibleMoves(testPiece);



