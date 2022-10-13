const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../middleware/catchAsync');
const filterObject = require('../utils/filterObject');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_TIME
    });
};

const createSendToken = (userId, req, res) => {
    const token = signToken(userId);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure
    });

    return token;
};

const sendLogoutCookie = (res) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now() + 1000),
        httpOnly: true
    });
};

exports.sendLogoutCookie = sendLogoutCookie;

exports.signup = catchAsync(async (req, res, next) => {
    const filteredBody = filterObject(
        req.body,
        'username',
        'email',
        'role',
        'password',
        'confirmPassword'
    );

    const newUser = await User.create(filteredBody);

    // Send the cookie.
    const token = createSendToken(newUser._id, req, res);

    // Remove the password property.
    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        message: 'Your account was created successfully.',
        token,
        data: {
            userId: newUser._id
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new AppError('Please provide an email address and password.', 400)
        );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
        return next(new AppError('Incorrect email address or password.', 401));
    }

    const token = createSendToken(user._id, req, res);

    res.status(200).json({
        status: 'success',
        message: 'You were logged in successfully.',
        token,
        data: {
            userId: user._id
        }
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError("You're not logged in.", 401));
    }

    let decodedToken;

    try {
        decodedToken = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
        );
    } catch (err) {
        sendLogoutCookie(res);
        return next(new AppError("You're not logged in.", 401));
    }

    const user = await User.findById(decodedToken.id).select('+email');

    if (!user) {
        sendLogoutCookie(res);
        return next(new AppError("You're not logged in.", 401));
    }

    req.user = user;
    next();
});

exports.logout = (req, res, next) => {
    sendLogoutCookie(res);
    res.status(200).json({ status: 'success' });
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "You don't have permission to perform this action.",
                    403
                )
            );
        }

        next();
    };
};
