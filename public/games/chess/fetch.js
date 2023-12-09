

async function fetchResponse() {
    const FEN = "r1b2rk1/pp1qbppp/5n2/2pPp1B1/1n1P4/2N2N2/PPPQBPPP/R4RK1 w - c6 0 11"
    object = {fen : FEN}

    const data = await fetch(`/api/newGame/`,    
    {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    })

    const response = await data.json()
    return response
}

async function submitMove(move) {
    await fetch(`/submitMove/${move}`,
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: ''
    })
    .then(response => {
        DISPLAY = new Display(response)
    })

}

async function refresh() {
    const id = document.location.pathname.split('/').slice(-1)
    const data = await fetch(`/api/chess/response/${id}`,
    {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const response = await data.json()
    return response
}

