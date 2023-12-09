const router = require('express').Router()


router.get('/chess/:id', async (req, res) => {
    try {
        res.render('chess')
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/chess/game/:id', async (req, res) => {
    try{      
        res.render('chess')

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router