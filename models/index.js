const User = require('./user')
const Chess = require('./chess')
const Chess4 = require('./chess4')
const Player = require('./player')
const Preferences = require('./preferences')

User.hasMany(Player, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Player.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Player.hasOne(Chess, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Chess.belongsTo(Player, { 
    foreignKey: 'player_1',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Chess.belongsTo(Player, { 
    foreignKey: 'player_2',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Preferences.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

User.hasOne(Preferences, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})






module.exports = { User, Player, Preferences, Chess, Chess4}