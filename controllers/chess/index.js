const { Chess_Game, Default } = require ('../../games/chess')
const { Chess, User } = require ('../../models/index')
const { readID, writeID, writeNewGame } = require('../../utils/chess/read-write')
const { saveElo } = require ('../../utils/chess/calculate-elo')
const router = require('express').Router()

router.get('/:id', (req, res) => {
    res.json({message: 'good'})
})

router.put('/newGame', async (req, res) => {
    try {
        const newGame = await writeNewGame(req.body)
        
        const game = new Chess_Game(newGame)
        game.table()
        res.json(game).status(200)
        
    } catch(err) {
        console.log(err)
        res.json(err) 
    }
})

router.put('/move', async (req, res) => {
    try{
        const options = await readID(req.body.id)
        if(!options)
        {
            res.status(404).json("Game doesn't exist")
        }
        const game = new Chess_Game(options)

        if(!game.status){ //Prevent old games from being moved unnecessarily
            res.json(200).json(game)
            return
        }

        if( (game.turn === 'w' && req.session.user_id === game.player_1) || 
            (game.turn === 'b' && req.session.user_id === game.player_2  ||
                req.session.admin)){

                game.table()
                game.submit(req.body.move)   
                game.table()
            }
        else{
            res.json("Not your move! Illegal").status(403)
            return
        }        

        const data = await writeID(game)
        if (!data){
            res.json({message: "No game found"}).status(404)
        }        
        else{
            const options = await readID(req.body.id)
            const game = new Chess_Game(options)

            
            if(!game.status){
                await saveElo(game.player_1, game.player_2)
            }

            res.json(game).status(200)
        }

    } catch(err) {
        console.log(err)
        res.json(err)
    }
})


router.get('/response/:id', async (req, res) => {
    try{
        const options = await readID(req.params.id)
        if(!options)
        {
            res.status(404).json("Game doesn't exist")
            return
        }
        const game = new Chess_Game(options)    
        game.table()
        res.json(game)
    } catch(err) {
        console.log(err)
        res.json(err)
    }
})


module.exports = router