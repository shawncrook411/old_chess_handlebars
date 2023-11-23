const express = require('express')
const path = require('path')
const api = require('./routes')

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded( {extended : true }))
app.use(express.static('public'))

app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use('/api/', api)


app.listen(PORT, () => {
   console.log(`Server is live! Listening at Port: ${PORT}`)
})

module.exports = app






