

async function fetchResponse() {
    const FEN = ""
    object = {fen : FEN}

    const data = await fetch(`/response/`,    
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
