const router = require('express').Router()
const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')

router.post('/createAccount', async (req, res) => {
    try{
        const newUserName = req.body.username
        const newPassword = req.body.password
        const newEmail = req.body.email

        if(!newEmail || !newPassword || !newUserName) {
            res.status(400).json('Missing valid credentials') 
            return
        }

        const userData = await User.findOne({ where: sequelize.or( {username: newUserName}, {email: newEmail} )})
        if (userData){
            res.status(409).json('Username or email already exists')
            return
        }

        const newUser = await User.create({
            username: newUserName,
            password: newPassword,
            email: newEmail
        })

        if(newUser){
            req.session.save( () => {
                req.session.loggedIn = true
                req.session.username = newUserName
                req.session.user_id = newUser.id
                if(newUser.admin) req.session.admin = true
            })
        }
        else{
            res.status(500).json('Couldnt create new user')
            return
        }
        
        res.status(200).json(`New User Created with ID: ${newUser.id} and Username: ${newUser.username} `)       

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try{
       const username = req.body.username
       const email = req.body.email
       const password = req.body.password

        const userData = await User.findOne({ where: sequelize.or( { username: username }, {email: email} )})
        if (!userData) {
            res.status(404).json({ message: 'Login Failure'})
            return
        }

        const validPassword = await bcrypt.compare(
            password,
            userData.password
        )

        if(!validPassword) {
            res.status(400).json({ message: 'Login Failure'})
            return
        }

        req.session.save( () => {
            req.session.loggedIn = true
            req.session.username = username
            req.session.user_id = userData.id
            if(userData.admin) req.session.admin = true
            res.status(200).json({ message: 'Login successful' })
        })

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/logout', async (req, res) => {    
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }    
})

module.exports = router