const User = require('./user')
const Chess = require('./chess')

User.belongsToMany(Chess, {through: 'User_Games' })
Chess.belongsToMany(User, {through: 'User_Games' })

module.exports = { User, Chess }