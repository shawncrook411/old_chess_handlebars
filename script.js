const { response } = require('./models/controller')

var createColumn = document.createElement("div");
var createSquare = document.createElement("div");
var boardState = document.getElementById("board_border");


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
                    y.setAttribute("class", "square primary_square")
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

startButton = document.getElementById("start-game")

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("start game")
    startTimer(gameTime)}
);

createBoard(preferences[1]);
displayBoard();





