const router = require('express').Router();

const jokeController = require('../controllers/jokeController');
const authController = require('../controllers/authController');

router.route('/').get(jokeController.getAllJokes);

router.use(authController.protect, authController.restrictTo('admin'));

router.route('/').post(jokeController.createJoke);

router
    .route('/:id')
    .patch(jokeController.updateJoke)
    .delete(jokeController.deleteJoke);

module.exports = router;
