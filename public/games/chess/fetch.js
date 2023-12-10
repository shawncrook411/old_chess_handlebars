

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

async function submitMove(move, id) {
    await fetch(`/api/chess/move`,
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: {id: id, move: move}
    }).then(reload())
}

async function refresh() {
    const location = document.location.pathname.split('/')
    let id
    if(location){  id = location[location.length - 1]}
    else { id = localStorage.getItem('id')}

    if (!id) return
    
    const data = await fetch(`/api/chess/response/${id}`,
    {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const response = await data.json()
    new Display(response)
    return
}

