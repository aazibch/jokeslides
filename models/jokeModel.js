const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

const jokeSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Joke is required.'],
        unique: true
    },
    source: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: new Date()
    }
});

jokeSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        if (Object.keys(error.keyPattern)[0] === 'content') {
            return next(new AppError('This joke already exists.', 400));
        }
    }

    next();
});

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;
