const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username.'],
        minlength: [3, 'The username should at least have three characters.'],
        validate: {
            validator: function (val) {
                return /^[a-zA-Z0-9_]*$/.test(val);
            },
            message:
                'The username can only contain alphanumeric characters (letters A-Z, numbers 0-9) and underscores (_).'
        },
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address.'],
        validate: [validator.isEmail, 'Please provide a valid email address.'],
        unique: true,
        lowercase: true,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minlength: [8, 'The password should at least have eight characters.'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            validator: function (val) {
                return val === this.password;
            },
            message: 'Passwords do not match.'
        }
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});

userSchema.methods.isPasswordCorrect = async function (
    inputPass,
    encryptedPass
) {
    return await bcrypt.compare(inputPass, encryptedPass);
};

userSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        if (Object.keys(error.keyPattern)[0] === 'username') {
            return next(new AppError('The username is taken.', 400));
        }

        if (Object.keys(error.keyPattern)[0] === 'email') {
            return next(
                new AppError(
                    'An account with the entered email already exists.',
                    400
                )
            );
        }
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
