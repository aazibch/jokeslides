const AppError = require('../utils/AppError');

const getCastError = (err) => {
    const message = `Invalid value "${err.value}" for the path "${err.path}".`;
    return new AppError(message, 400);
};

const getDublicateFieldError = (err) => {
    const key = Object.keys(err.keyPattern)[0];
    const message = `Duplicate value for the key "${key}".`;
    return new AppError(message, 400);
};

const getValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        if (el.name === 'CastError')
            return `Invalid value "${el.value}" for the path "${el.path}".`;

        return el.message;
    });

    const message = `The following validation error(s) occured: ${errors.join(
        ' '
    )}`;
    return new AppError(message, 400);
};

const sendError = (err, req, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong.'
    });
};

module.exports = (err, req, res, next) => {
    console.log('[globalErrorHandler] error', err);
    let errorObj = { ...err };
    errorObj.message = err.message;

    if (err.name === 'CastError') errorObj = getCastError(err);
    if (err.code === 11000) errorObj = getDublicateFieldError(err);
    if (err.name === 'ValidationError') errorObj = getValidationError(err);

    sendError(errorObj, req, res);
};
