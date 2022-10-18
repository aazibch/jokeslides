const catchAsync = require('../middleware/catchAsync');
const filterObject = require('../utils/filterObject');
const Joke = require('../models/jokeModel');

exports.getAllJokes = catchAsync(async (req, res, next) => {
    const jokes = await Joke.find();

    res.status(200).json({
        status: 'success',
        data: jokes
    });
});

exports.createJoke = catchAsync(async (req, res, next) => {
    const newJoke = await Joke.create(req.body);

    res.status(201).json({
        status: 'success',
        data: newJoke
    });
});

exports.updateJoke = catchAsync(async (req, res, next) => {
    const filteredUpdatedData = filterObject(req.body, 'content', 'source');

    const updatedJoke = await Joke.findByIdAndUpdate(
        req.params.id,
        filteredUpdatedData,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        status: 'success',
        data: updatedJoke
    });
});

exports.deleteJoke = catchAsync(async (req, res, next) => {
    await Joke.findByIdAndDelete(req.params.id);

    res.status(204).send();
});
