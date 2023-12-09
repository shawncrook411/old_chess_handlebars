
var retrieveDATA = function(){
    const main = document.querySelector('#main_section')
    let ID = main.getAttribute('data-id')
    if (!ID) ID = document.location.pathname.split('/').slice(-1)
    return ID
}




//Finds the input Move box and sends the move to submit. 
var submit = async (event) => {
    event.preventDefault()

    const move = document.querySelector('#move').value.trim()
    if (!move) return

    if (!GLOBAL.legal.includes(move)){
        alert('Illegal Move')
        return
    }

    const ID = retrieveDATA()
    
    object = { id: ID, move: move}

    console.log(object)
    await fetch(`/api/move/`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    })
    .then(() => {
        document.reload()
    })
}

