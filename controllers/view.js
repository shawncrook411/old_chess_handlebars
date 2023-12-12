const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            loggedIn: req.session.loggedIn
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/login', async (req, res) => {
    try{
        res.render('login', {
            loggedIn: req.session.loggedIn,
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/chess', async (req,res) => {
    try{
        res.render('new_chess', {
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/chess/:id', async (req, res) => {
    try {
        res.render('chess', {
            loggedIn: req.session.loggedIn
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/chess/game/:id', async (req, res) => {
    try{      
        res.render('chess', {
            loggedIn: req.session.loggedIn
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router