const router = require('express').Router()
const { Game, Response, Default, Square, Board, Position, Piece, King, Queen, Rook, Bishop, Knight, Pawn } = require('../classes/index')
const { User, Player, Preferences, Chess, Chess4} = require('../models/index')
const sequelize = require('../config/connection')


module.exports = router

router.get('/', async (req, res) => {
    try{
        res.render('homepage')

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/chess/game/:id', async (req, res) => {
    try{      
        res.render('homepage', {
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            
        })
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

