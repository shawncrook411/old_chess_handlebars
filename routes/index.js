const app = require('../server.js')
const submit = require('./submit.js')
const meta = require('./meta.js')


app.use('/submit', submit)

app.use('/meta', meta)

app.put('/response/', (req, res) => {
    res.json(game.respond())
})

module.exports = { app }









