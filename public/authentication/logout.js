const logout = async () => {
  
    const response = await fetch('/user/logout',
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        alert('Logout Successful')
        document.location.replace('/')
    } else {
        alert('Logout Failure')
    }
}

document.getElementById('logoutButton').addEventListener('click', logout)