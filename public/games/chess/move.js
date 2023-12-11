
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
        alert('Illegal Move')
        return
    }

    const ID = localStorage.getItem('id')    
    object = { id: ID, move: move}

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
        localStorage.setItem('touch1', square_id)
        target.classList.add('touch1')
    }
    else{
        localStorage.setItem('touch2', square_id)
        document.querySelector('.touch1').classList.remove('touch1')
        submit()
    }    
}
