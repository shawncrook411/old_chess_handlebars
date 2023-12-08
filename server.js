const path = require('path')

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const routes = require('./controllers')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3001

const cookieSession = {
    secret: '0',
    cookie: {
        maxAge: 1000 * 60 * 30  //Valid session : 30 minutes
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(cookieSession))

const hbs = exphbs.create({ helpers })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on PORT: ${PORT}`))
})

