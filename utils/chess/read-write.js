const { Chess_Game, Default } = require ('../../games/chess')
const { Chess, User } = require ('../../models/index')

//Reads an ID, finds the cooresponding game, and returns a Chess_Game object that is usable
const readID = async function(id){
    const data = await Chess.findOne({
        where: {
            id: id
        },
    })

    const game = new Chess_Game(data)
    return game
}

const writeNewGame = async function(game){

    //Allows you to manually set their time, otherwise will default to starting time
    if(!game.player_1_time) game.player_1_time = game.time
    if(!game.player_2_time) game.player_2_time = game.time

    const newData = await Chess.create({
        //All are optional but will Default
        FEN: game.FEN,   
        player_1: game.player_1,
        player_2: game.player_2,        
        player_1_time: game.player_1_time,
        player_2_time: game.player_2_time,
        variant: game.variant,
        time: game.time,
        inc: game.inc,
        bonus: game.bonus,
        width: game.width,
        height: game.height,
        status: game.status,
        turn: game.turn,
        castling: game.castling,
        moves: game.moves,
        movelist: game.movelist,
        draw50: game.draw50,
        target: game.target,
        result: game.result,
        termination: game.termination,
        opening: game.opening
    })
    return newData

}

const writeID = async function(game){
    if(game.id){
        const data = await Chess.findOne({
            where: {
                id: game.id
            },
        })

        if(data){        
            const updatedData = await Chess.update({
                FEN: game.FEN,
                player_1_time: game.player_1_time,
                player_2_time: game.player_2_time,
                status: game.status,
                turn: game.turn === 1 ? 'w' : 'b',
                castling: game.castling,
                moves: game.moves,
                movelist: game.movelist,
                draw50: game.draw50,
                target: game.target,
                result: game.result,
                termination: game.termination,
                opening: game.opening
            },
            {
                where: {id: game.id},
            })

            if(updatedData){
                const response = await Chess.findOne({
                    where: {
                        id: game.id
                    }
                })
                return response
            }    
            return updatedData        
        }        
    }    
}

module.exports = { readID, writeID, writeNewGame }