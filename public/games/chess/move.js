
//Finds the input Move box and sends the move to submit. 
var submit = async (event) => {
    if(event) event.preventDefault()

    const start = localStorage.getItem('touch1')
    const end   = localStorage.getItem('touch2')
    let move = `${start}${end}`

    localStorage.removeItem('touch1')
    localStorage.removeItem('touch2')

    if (!start || !end){
        move = document.querySelector('#move').value.trim()
    }
   
    const moves = localStorage.getItem('legal')
    
    if (!moves || !moves.includes(move)){
        return
    }

    const ID = localStorage.getItem('id')    
    object = { id: ID, move: move, time: (localStorage.getItem('activeTime') / 10)}

    const response = await fetch(`/api/chess/move/`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    })
    refresh()
    return response
}

var touchMove = async (event) => {
    event.preventDefault()
    const target = event.target
    const square_id = target.getAttribute('square-id')

    if(!localStorage.getItem('touch1')){
        if(!target.classList.contains('piece')) return //Don't want to start the touch move if clicking an empty square
        localStorage.setItem('touch1', square_id)
        target.classList.add('touch1')

        let legal = localStorage.getItem('legal')
        legal = legal.split(',')        

        //Adds hover class to the squares your piece COULD move to
        let brokenMoves = []
        legal.forEach( move => {
            if (legal.indexOf(move) % 2 === 0) return

            let newMove = {
                start : move[0] + move[1],
                end : move[2] + move[3]
            }
            brokenMoves.push(newMove)
        })
        brokenMoves.forEach( move => {
            if(move.start === square_id){
                let hover = document.querySelector(`[square-id=${move.end}]`)
                hover.classList.add('hover')
            }
        })
    }

    else{
        localStorage.setItem('touch2', square_id)
        document.querySelector('.touch1').classList.remove('touch1')
        submit()
    }    
}

