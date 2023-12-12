const DATA = {
    piecelink: 'https://raw.githubusercontent.com/lichess-org/lila/cf1ad792dafa8b7bebad8cc262826d9e0a165491/public/piece/',
    style: 'pixel'
}

class Display{
    constructor(response)
    {
        this.id = response.id
        this.FEN = response.FEN
        this.legal = []
        
        if(response.legal){
            response.legal.forEach(move =>{
                this.legal.push(move.string)
                this.legal.push(move.command)
            })}

        this.player_1 = response.player_1
        this.player_2 = response.player_2
        this.player_1_time = response.player_1
        this.player_2_time = response.player_2
        this.moves = response.moves
        this.movelist = response.movelist
        this.width = response.width
        this.height = response.height
        this.status = response.status
        this.turn = response.turn
        this.target = response.target
        this.result = response.result
        this.termination = response.termination
        this.board = response.board

        this.displayALL()
    }

    displayALL(){
        this.displayBOARD()
        this.displayPIECES()
        this.displayMOVELIST()
        this.displayCLOCKS()
        this.displaySTATUS()
        this.saveDATA()
    }

    saveDATA(){
        localStorage.removeItem('touch1')
        localStorage.removeItem('touch2')
        localStorage.setItem('id', this.id)
        localStorage.setItem('legal', this.legal)
        localStorage.setItem('player_1_time', this.player_1_time)
        localStorage.setItem('player_2_time', this.player_2_time)
        localStorage.setItem('turn', this.turn)
    }

    startTimer(){
        time_WHITE = this.player_1_time
        time_BLACK = this.player_2_time
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
        
        whiteClock.textContent = this.timerConvert( this.player_1_time )
        blackClock.textContent = this.timerConvert( this.player_2_time )
    }

    displayBOARD(){   
        let position = document.getElementById("board_border")
        while(position.firstChild) position.removeChild(position.firstChild)
       
        const board = []
        this.board.forEach(row => board.splice(0, -1, row))

        newRow: for(let row of board)
        {
            let display_row = document.createElement('div')
            display_row.setAttribute('class', 'row')
            newSquare: for(let square of row)
            {
                let display_square = document.createElement('div')
                display_square.setAttribute('id', `${square.id}`)
                display_square.setAttribute('square-id', `${square.id}`)

                if( (square.x + square.y) % 2 == 0) { display_square.setAttribute('class', 'square primary_square')}
                else                                { display_square.setAttribute('class', 'square secondary_square')}

                display_square.addEventListener('click', touchMove)    
                display_row.appendChild(display_square)        
            }
                position.appendChild(display_row)
        }
    }

    displayPIECES(){
        displayPieces_row: for(let row of this.board)
        {
            displayPieces_checkSquare: for (let square of row)
            {
                if (square.occupant !== '0')
                {
                    let char = square.occupant.type
                    let color = square.occupant.color                    

                    if (DATA.style === 'disguised') char = ''

                    let source = `${DATA.piecelink}/${DATA.style}/${color}${char.toUpperCase()}.svg`

                    let anchor = document.createElement('a')
                    anchor.setAttribute('square-id', `${square.id}`)
                    anchor.setAttribute('class', 'square-anchor')

                    let image = document.createElement('img')
                    image.setAttribute('square-id', `${square.id}`)
                    image.setAttribute('src', source)
                    image.classList.add('piece')

                    let display_square = document.getElementById(`${square.id}`)

                    display_square.appendChild(anchor)
                    anchor.appendChild(image)
                }                
            }
        }
    }
    
    displayMOVELIST(){
        const list = document.querySelector('#moveslist')
        while(list.firstChild) list.removeChild(list.firstChild)

        let array = this.movelist.split(',')
        array.forEach((move) => {
            const index = array.indexOf(move)
            if(index % 2){
                list.lastChild.textContent += ` ${move}`
            }
            else{    
                const moveItem = document.createElement('li')
                moveItem.textContent = `${move}`
                list.append(moveItem)
            }
        })

        if(this.termination === 'Checkmate'){
            //Adds '#' symbol to end of move to denote checkmate            
            let text = list.lastChild.textContent.slice(0, -1)          
            text += '#'
            list.lastChild.textContent = text        
        }

        if(!this.status){
            let result = document.createElement('p')
            result.textContent = this.result
            result.setAttribute('id', 'resultText')
            list.append(result)
        }
    }

    displaySTATUS(){
        if(!this.status){            
            const board = document.querySelector('#board')
            switch(this.termination){
                case 'Checkmate':
                    board.classList.add('checkmate')    
                    break

                case 'Stalemate':
                    board.classList.add('stalemate')
                    break
            }
        }
    }
}
