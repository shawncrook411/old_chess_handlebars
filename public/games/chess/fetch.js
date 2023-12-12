var globalDisplay;

async function submitMove(move, id) {
    await fetch(`/api/chess/move`,
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: {id: id, move: move}
    }).then(reload())
}

async function refresh() {  
    if(window.myInterval) clearInterval(window.myInterval)
    
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
    
    return new Display(response)
}

