const EloRank = require('elo-rank') 
const { User } = require('../../models/index')               

var saveElo = async (player_1_id, player_2_id) => {

        const player_1 = await User.findOne({where: {id: player_1_id}})
        const player_2 = await User.findOne({where: {id: player_2_id}})      

        const elo1 = new EloRank(player_1.k_factor)
        const elo2 = new EloRank(player_1.k_factor)

        switch(game.result){
            case '1-0':
                player_1.elo = elo1.updateRating( elo1.getExpected(player_1.elo, player_2.elo), 1, player_1.elo)
                player_2.elo = elo2.updateRating( elo2.getExpected(player_2.elo, player_1.elo), 0, player_2.elo)

                player_1.chess_win_count++
                player_2.chess_loss_count++

                player_1.chess_win_streak++
                player_2.chess_win_streak = 0
                player_1.chess_loss_streak = 0
                player_2.chess_loss_streak++
                break

            case '0-1':
                player_1.elo = elo1.updateRating( elo1.getExpected(player_1.elo, player_2.elo), 0, player_1.elo)
                player_2.elo = elo2.updateRating( elo2.getExpected(player_2.elo, player_1.elo), 1, player_2.elo)

                player_2.chess_win_count++
                player_1.chess_loss_count++

                player_2.chess_win_streak++
                player_1.chess_win_streak = 0
                player_2.chess_loss_streak = 0
                player_1.chess_loss_streak++
                break

            case '1/2-1/2':
                player_1.elo = elo1.updateRating( elo1.getExpected(player_1.elo, player_2.elo), .5, player_1.elo)
                player_2.elo = elo2.updateRating( elo2.getExpected(player_2.elo, player_1.elo), .5, player_2.elo)

                player_1.chess_draw_count++
                player_2.chess_draw_count++
                break
        }

        await User.update({
            elo: player_1.elo,
            k_factor: player_1.k_factor,
            chess_win_count: player_1.chess_win_count,
            chess_loss_count: player_1.chess_loss_count,
            chess_draw_count: player_1.chess_draw_count,
            chess_win_streak: player_1.chess_win_streak,
            chess_loss_streak: player_1.chess_loss_streak,
        },{where: { id: game.player_1}})

        await User.update({
            elo: player_2.elo,
            k_factor: player_2.k_factor,
            chess_win_count: player_2.chess_win_count,
            chess_loss_count: player_2.chess_loss_count,
            chess_draw_count: player_2.chess_draw_count,
            chess_win_streak: player_2.chess_win_streak,
            chess_loss_streak: player_2.chess_loss_streak,
        },{where: { id: game.player_2}})
}

module.exports = { saveElo }