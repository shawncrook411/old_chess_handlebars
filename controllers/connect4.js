const router = require('express').Router();
const { connect4Weights } = require('../utils/random')

router.get('/', (req, res) => {
    res.render('layouts/games/connect4', {
        layout: 'main',
        currentUser: req.session.username,
    });
});
  
router.put('/placement', (req, res) => {
    const game = req.body
    const response = connect4Weights(game)
    res.json(response)
})

module.exports = router;