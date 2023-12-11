const User = require('./user')
const Chess = require('./chess')
const FEN_table = require('./FEN')

User.belongsToMany(Chess, {through: 'User_Games' })
Chess.belongsToMany(User, {through: 'User_Games' })

Chess.hasMany(FEN_table, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE',
})

FEN_table.belongsTo(Chess, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE',
})

Chess.afterCreate( async (chess) => {
    await FEN_table.create({
        game_id: chess.id,
        FEN: chess.FEN
    })
})

Chess.afterBulkCreate( async (chessGames) => {
    chessGames.forEach(async (chess) => {
        await FEN_table.create({
            game_id: chess.id,
            FEN: chess.FEN
        })    
    })    
})

Chess.afterUpdate( async (chess) => {
    await FEN_table.create({
        game_id: chess.id,
        FEN: chess.FEN
    })
})

Chess.afterBulkUpdate( async (chessGames) => {
    if (chessGames.length > 0){
        // ******** FOR EACH BULK UPDATE HAS NOT BEEN TESTED!! *********** //
        chessGames.forEach(async (chess) => {
            await FEN_table.create({
                game_id: chess.id,
                FEN: chess.FEN
            })    
        })    
    }
    else{
        await FEN_table.create({
            game_id: chessGames.where.id,
            FEN: chessGames.attributes.FEN 
        })        
    }
})

module.exports = { User, Chess, FEN_table }