const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'The joke content is required.'],
        unique: [true, 'This joke already exists.']
    },
    source: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: new Date()
    }
});

const Joke = mongoose.model('Joke', jokeSchema);

module.exports = Joke;
