const FEN = "4N3/3Pq2k/3pBP2/K7/5p2/5pnr/1p1p3p/n7&nbspw&nbsp-&nbsp-&nbsp0&nbsp1"

object = {name: "test", fen: FEN, end: "end"}

async function fetchResponse() {
    const data = await fetch(`/response/${FEN}`,
    
    {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
      }
    
    )   
    const response = await data.json()
    return response
}

fetchResponse().then(response => { 

    DIS = new Display(response)

    console.log(DIS)
 })


    
    

var boardState = document.getElementById("board_border");


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



startButton = document.getElementById("start-game")

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    console.log("start game")
    startTimer(gameTime)}
);






