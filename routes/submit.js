const app = require('./index.js')

app.put('/move/', (req, res) => {
    game.submit(req.params.move)
    res.json(game.respond())
})

app.put('draw', (req, res) => {

})

app.put('resign', (req, res) => {
    
})


app.put('claimDraw', (req, res) => {
    
})



