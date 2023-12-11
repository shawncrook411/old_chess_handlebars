const router = require('express').Router()
const { User } = require('../models/index')
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
        
        res.status(200).json(`New User Created with ID: ${newUser.id} and Username: ${newUser.username} `)       

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router