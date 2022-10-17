const router = require('express').Router();

const authController = require('../controllers/authController');

// router.post('/signup', authController.signup);
router.post('/login', authController.login);

// We only get a cookie, so GET HTTP verb makes sense
router.get('/logout', authController.logout);

router.get(
    '/current',
    authController.checkUserIsLoggedIn,
    authController.getLoggedInUser
);

module.exports = router;
