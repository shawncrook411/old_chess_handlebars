// fetchResponse().then(response => {
//     DISPLAY = new Display(response)
// })

var DISPLAY;


refresh().then(response => {
    DISPLAY = new Display(response)
    GLOBAL = response    
}).then(() => {
    const input = document.querySelector('#input')
    input.addEventListener('submit', submit) 
})


    
// var boardState = document.getElementById("board_border");

// var startTimer = function setTime(gameTime) {
//     let whiteSecondsLeft = gameTime;
//     let blackSecondsLeft = gameTime;

//     var Timer = setInterval(function() {

//         if (playerMove === 1){
//             whiteSecondsLeft--;
//         }
//         else{
//             blackSecondsLeft--;
//         }

//         let w = timerConvert(whiteSecondsLeft);
//         let b = timerConvert(blackSecondsLeft);

//         whiteClock.textContent = w;
//         blackClock.textContent = b;         
    
//         if(whiteSecondsLeft <= 0) 
//         {   
//             whiteClock.textContent = "00:00.0";
//             clearInterval(Timer) 
//             gameTimeOut(-1);
//         }

//         if(blackSecondsLeft <= 0) 
//         {   
//             blackClock.textContent = "00:00.0";
//             clearInterval(Timer)  
//             gameTimeOut(1);
//         }        

//     }, 100);
// }

// startButton = document.getElementById("start-game")

// startButton.addEventListener("click", function(event) {
//     event.preventDefault();
//     console.log("start game")
//     startTimer(gameTime)}
// );