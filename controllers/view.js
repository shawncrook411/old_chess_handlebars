const router = require('express').Router()
const { Chess, User } = require('../models/index')
const sequelize = require('../config/connection')

router.get('/', async (req, res) => {
    try {
        res.render('layouts/homepage', {
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
        res.render('layouts/login', {
            loggedIn: req.session.loggedIn,
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/signup', async (req, res) => {
    try{
        res.render('layouts/signup', {
            loggedIn: req.session.loggedIn
        })
    } catch(err) {}
})

router.get('/dashboard', async (req, res) => {
    try{
        if(!req.session.loggedIn)
        {
            res.redirect('/login')
            return
        }
    const games = await Chess.findAll({
        where: sequelize.or({ player_1: req.session.user_id }, { player_2: req.session.user_id }),
        include: [{ model: User}]
    })

    gamesData = games.map((game) => game.get({plain: true}))

    res.render('layouts/dashboard', {
        gamesData,
        loggedIn: req.session.loggedIn
    })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}) 

module.exports = router