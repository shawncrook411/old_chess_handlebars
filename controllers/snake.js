const router = require("express").Router();
const { snakeWeights } = require('../utils/random')

router.get('/snake', (req, res) => {
  res.render('snake', {
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

    module.exports = router;