const { User, Chess, FEN_table, } = require('../models/index')
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

    await Chess.bulkCreate([
        {
           player_1: 1,
           player_2: 2,            
        },
        {
            player_1: 1,
            player_2: 2,
            FEN: 'rnbqkbnr/ppQppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
         },
         {
            player_1: 1,
            player_2: 1,
            FEN: 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3'
         }
        ])

    await Chess.create({
        player_1: 1,
        player_2: 2,
        FEN: 'rnbqkbnr/ppQppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'
    })
}

seedDatabase()