
//Finds the input Move box and sends the move to submit. 
var submit = async (event) => {
    event.preventDefault()

    const move = document.querySelector('#move').value.trim()

    const moves = localStorage.getItem('legal')
    if (!moves || !move) return
    if (!moves.includes(move)){
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

