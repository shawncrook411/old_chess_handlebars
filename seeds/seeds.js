const { User, Player, Preferences, Chess, Chess4} = require('../models/index')
const sequelize = require('../config/connection.js')

const seedDatabase = async() => {
    await sequelize.sync({ force: true})

    await User.bulkCreate([
        {
            username: 'ShawnCrook',
            email: 'shawncrook411@gmail.com',
            password: '0',
            admin: true
        },
        {
            username: 'TestPlayer',
            email: 'testing@gmail.com',
            password: '1',
        }
    ])

    await Player.bulkCreate([
        {
            user_id: 1,
            player_number: 1,
        },
        {
            user_id: 2,
            player_number: -1,
        }
    ])

    await Chess.create(
        {
           player_1: 1,
           player_2: 2,            
        }
    )
}

seedDatabase()