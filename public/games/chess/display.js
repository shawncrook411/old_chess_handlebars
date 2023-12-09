const DATA = {
    piecelink: 'https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/',
    style: 'pixel'
}

class Display{
    constructor(response)
    {
        this.options = response.options
        this.position = response.position
        // this.time_WHITE = response.players[0].time
        // this.time_BLACK = response.players[1].time
        this.displayALL()
    }

    displayALL(){
        this.displayBOARD()
        this.displayCLOCKS()
        this.saveDATA()
    }

    saveDATA(){
        const main = document.querySelector('#main_section')
        main.setAttribute('data-id', this.options.id)
    }

    startTimer(){
        time_WHITE = this.time_WHITE
        time_BLACK = this.time_BLACK
    }

    timeout(result){
        let whiteClock = document.querySelector("#player1Clock");
        let blackClock = document.querySelector("#player2Clock"); 

        if ( result ===  1 ) { blackClock.textContent = "00:00.0" }
        if ( result === -1 ) { whiteClock.textContent = "00:00.0" }
    }

    //Returns formatted string for CLOCK
    timerConvert(seconds){
        let minutes = `${Math.floor(seconds/ 60)}:`
        seconds = `${Math.floor( (seconds%600) / 10)}`

        if (seconds < 10){ seconds = `0${seconds}`}

        if (minutes === 0) {minutes = ''}

        return ( `${minutes}${seconds}.${seconds%10}`)
    }

    displayCLOCKS(){
        let whiteClock = document.querySelector("#player1Clock");
        let blackClock = document.querySelector("#player2Clock");      
        
        whiteClock.textContent = this.timerConvert( this.time_WHITE )
        blackClock.textContent = this.timerConvert( this.time_BLACK )

    }

    displayBOARD(){
        //Row decreases, generate top to bottom rows
        newRow: for(let i = this.options.height; i > 0; i--)
        {
            let column = document.createElement('div')
            column.setAttribute('class', 'column')
            newSquare: for (let j = 0; j < this.options.width; j++)
            {
                let square = document.createElement('div')
                square.setAttribute('id',  `${String.fromCharCode(8 - i + 65).toUpperCase()}${j+1}`,  )            

                if( (j+i) % 2 == 0){ square.setAttribute('class', 'square primary_square') }
                else { square.setAttribute('class', 'square secondary_square')}

                square.addEventListener('click', function(event){
                    //complete moves????? (event.target)
                })
                column.appendChild(square);
            }

            let board = document.getElementById("board_border")
            board.appendChild(column)
        }

        displayPieces_row: for (let i = 0; i < this.position.placement.length; i++)
        {
            displayPieces_checkSquare: for (let j = 0; j < this.position.placement[i].length; j++)
            {
                let char = this.position.placement[7 - i][j]
                if (char !== '-')
                {
                    let color = 'b'
                    if(char !== char.toLowerCase()) { color = 'w'}

                    if (this.options.style === 'disguised')
                    { char = ''}
                    
                    let source = `${DATA.piecelink}/${DATA.style}/${color}${char.toUpperCase()}.svg`

                    let anchor = document.createElement('a')
                    let image = document.createElement('img')

                    image.setAttribute('src', source)

                    let square = document.getElementById(`${String.fromCharCode(j+65).toUpperCase()}${i+1}`)

                    square.appendChild(anchor)
                    anchor.appendChild(image)
                }                
            }
        }
    }
}
