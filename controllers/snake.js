const router = require("express").Router();
const { snakeWeights } = require('../utils/random')

router.get('/', (req, res) => {
  res.render('layouts/games/snake', {
      layout: 'main',
      currentUser: req.session.loggedIn,
  });
});

router.put("/newApple", (req, res) => {
  try {
    const snake = req.body;
    const response = snakeWeights(snake);

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/record', (req, res) => {
  try{
    const score = req.body.snake_score

    //IMPLEMENT SCOREBOARD

    res.json({message: 'Record is not setup yet'})
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;