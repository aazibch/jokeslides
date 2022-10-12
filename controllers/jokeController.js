const Joke = require('../models/jokeModel');

exports.getAllJokes = catchAsync(async (req, res, next) => {
    const jokes = await Joke.find().sort('-dateAdded');

    res.status(200).json({
        status: 'success',
        data: jokes
    });
});
