const { Chess_Game, Default } = require('../games/chess')

describe('Chess Game instance methods', () => {
    test('Can create a new game with Default settings', () => {
        const game = new Chess_Game(Default)
        expect(game.white_king).toEqual({x: 4, y: 0})
    })

    test('Can check for Checkmate / Can also submit moves by traditional notation', () => {
        const game = new Chess_Game(Default)
        game.submit('f4')
        game.submit('e5')
        game.submit('g4')
        game.submit('Qh4')
        expect(game.termination).toEqual('Checkmate')
    })

    test('Can check for Stalemate / Can also submit moves in bulk and use UCI move conventions', () => {
        const game = new Chess_Game(Default)
        moveList = [
        'e3', 'a5',
        'Qh5', 'Ra6',
        'Qxa5', 'h5',
        'h4', 'a6h6', //Note the a6h6, in this position Rh6 WOUDLN'T be sufficient since both rooks can move. Rah6 vs Rhh6 has not yet been supported :(
        'Qxc7', 'f6',
        'Qxd7+', 'Kf7',
        'Qxb7', 'Qd3',
        'Qxb8', 'Qh7',
        'Qxc8', 'Kg6',
        'Qe6'
    ]
        game.submitBulk(moveList)
        expect(game.termination).toEqual('Stalemate')
    })



















})

