var timeout = async (event) => {
    if(event) event.preventDefault()

    const ID = localStorage.getItem('id')    

    const response = await fetch(`/api/chess/timeout/`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: ID}),
    })
    refresh()
    return response
}