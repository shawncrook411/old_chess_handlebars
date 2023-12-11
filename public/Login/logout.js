const logout = async () => {
  
    console.log('test')
    const response = await fetch('/logout',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        document.location.replace('/')
        alert('Logout Successful')
    } else {
        alert('Logout Failure')
    }
}

document.getElementById('logoutButton').addEventListener('click', logout)