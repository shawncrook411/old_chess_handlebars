const router = require('express').Router();
const { tic_tac_toe_Weights } = require('../utils/random')

router.get('/', (req, res) => {
    res.render('layouts/games/tic-tac-toe', {
        layout: 'main',
        currentUser: req.session.username,
    });
});

router.put('/placement', (req, res) => {
    const game = req.body
    const response = tic_tac_toe_Weights(game)
    res.json(response)
})

module.exports = router;