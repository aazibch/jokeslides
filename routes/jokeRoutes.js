const router = require('express').Router();

const jokeController = require('../controllers/jokeController');

router.get('/', jokeController.getAllJokes);

module.exports = router;
