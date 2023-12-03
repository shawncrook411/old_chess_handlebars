const router = require('express').Router()

//Need to add EMAIL support?
router.post('/', async (req, res) => {
    try{
        const newUserName = req.body.username
        const newPassword = req.body.password

        const userData = await User.findOne({ where: { username: newUserName }})
        if (userData){
            res.status(409).json('Username already exists')
            return
        }

        const newUser = await User.create({
            username: newUserName,
            password: newPassword
        })
        
        req.session.save(() => {
            req.session.loggedIn = true
            req.session.username = newUserName
            res.status(200).json(newUser)
        })
    } //this sends the password to user, is this an issue?     
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

///NEED TO ADD EMAIL SUPPORT
router.post('/login', async (req, res) => {
    try{
       const username = req.body.username
       const password = req.body.password

        const userData = await User.findOne({ where: { username: username }})
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

// //Change Password
// router.post()

// //Change username
// router.post()

// //Change email
// router.post()













module.exports = router