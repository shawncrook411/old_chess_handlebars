const router = require('express').Router()

const api = require('./api.js')
const view = require('./view.js')
const dev = require('./dev.js')
const userRoutes = require('./user-routes.js')

router.use('/api', api)

router.use('/dev', dev)

router.use('/user', userRoutes )

router.use('/', view)







module.exports = router