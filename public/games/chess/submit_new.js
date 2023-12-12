const createGame = async (event) => {

    event.preventDefault()

    const player_1 = document.querySelector('#player_1').value.trim()
    const player_2 = document.querySelector('#player_2').value.trim()
    const FEN = document.querySelector('#fen').value.trim()
    const variant =  document.querySelector('#variant').value.trim()
    const time = document.querySelector('#starting_time').value.trim()
    const inc = document.querySelector('#inc').value.trim()

    const object = {
        player_1: player_1,
        player_2: player_2,
    }

    if(FEN) object.FEN = FEN
    if(variant) object.variant = variant
    if(time) object.time = time
    if (inc) object.inc = inc

    if (player_1 && player_2) {
        const data = await fetch('/api/chess/newGame', {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: { 'Content-Type': 'application/json'}
        })

        
        if (data.ok) {
            alert('Game Start Successful, redirection to game...')
            const response = await data.json()    
            document.location.replace(`/chess/${response.id}`)
        } else {
            alert(data)
        }
    }
}

document.querySelector('#newgame-form').addEventListener('submit', createGame)