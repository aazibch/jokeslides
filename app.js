const path = require('path');
const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const jokeRoutes = require('./routes/jokeRoutes');
const userRoutes = require('./routes/userRoutes');
const globalErrorHandler = require('./middleware/globalErrorHandler');

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/jokes/', jokeRoutes);
app.use('/api/v1/users/', userRoutes);
app.use(globalErrorHandler);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}

module.exports = app;
