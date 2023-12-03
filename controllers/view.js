const router = require('express').Router()
module.exports = router

router.get('/', async (req, res) => {
    try{
        res.render('homepage')

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/chess', async (req, res) => {
    try{
        res.render('chess')

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Need to implent LOGIN.HANDLEBARS
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

//Need to implent SIGNUP.HANDLEBARS
router.get('/signup', async (req, res) => {
    try{
        res.render('signup', {
            loggedIn: req.session.loggedIn
        })
    } catch(err) {}
})

//Need to implent USER.handlebars
//Need to implent query for user by req.params.id
router.get('/user/:id', async (req, res) => {
    try{
        res.render('user')

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Need to implent GAME.handlebars
//Need to implement query for specific game
//Need to check if LOGGED IN &&& player in player to control board

router.get('/game/:id', async (req, res) => {
    try{
        res.render('game')
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

