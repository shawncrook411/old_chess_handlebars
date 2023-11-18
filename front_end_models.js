const DATA = {
    piecelink: ['https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/', '/w.svg']
}

class Display{
    constructor(response)
    {
        this.options = response.options
        this.positon = response.position
        this.display()
    }

    //Returns formatted string for CLOCK
    timerConvert(seconds){
        minutes = `${Math.floor(seconds/x)}`
        seconds = `${Math.floor( (seconds%600) / 10)}`

        if (seconds < 10){ seconds = `0${seconds}`}
    }

    displayCLOCKS(){
        let whiteClock = document.querySelector("#player1Clock");
        let blackClock = document.querySelector("#player2Clock");      
        
        whiteClock.textContent = "00:00"
        blackClock.textContent = "00:00"

    }

    display(){
        //Row decreases, generate top to bottom rows
        newRow: for(let i = this.options.sizeY; i > 0; i--)
        {
            let row = documnet.createElement('div')
            row.setAttribute('class', 'column')
            newSquare: for (let j = 0; j < this.options.sizeX; j++)
            {
                let square = document.createElement('div')
                square.setAttribute('id',  `${String.fromCharCode(j+65).toUpperCase()}${i}`,  )
            }

            if( (j+i) % 2 == 0){ square.setAttribute('class', 'square primary_square') }
            else { square.setAttribute('class', 'square secondary_square')}

            square.addEventListener('click', function(event){
                //complete moves????? (event.target)
            })
            row.appendChild(square);
        }
        document.getElementById('board_boarder').appendChild(row)

        displayPieces_row: for (let i = this.position.placement.length; i > 0; i--)
        {
            displayPieces_checkSquare: for (let j = 0; j < this.position.placement[i].length; j++)
            {
                char = this.position.placement[i][j]
                if (char !== '-')
                {
                    let color = 'b'
                    if(char !== char.toLowerCase()) { color = 'w'}

                    if (this.options.style === 'disguised')
                    { char = ''}
                    else
                    { source = `${DATA.piecelink[0]}/${this.options.style}/${color}${char.toUpperCase()}.svg` }

                    anchor = document.createElement('a')
                    image = document.createElement('img')

                    image.setAttribute('src', source)

                    square = document.getElementById(`${String.fromCharCode(j+65).toUpperCase()}${i}`)
                    square.addEventListener('click', function() {console.log('Click! front_end_models.js ln 57')})

                    square.appendChild(anchor)
                    anchor.appendChild(image)
                }                
            }
        }

    this.displayCLOCKS()


    }
}