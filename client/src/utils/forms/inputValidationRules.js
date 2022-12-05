import { createValidationRule } from './helpers';
import validator from 'validator';

export const requiredRule = (inputName) => {
    return createValidationRule(
        'required',
        `${inputName} is required.`,
        (inputValue) => inputValue.length !== 0
    );
};

export const minLengthRule = (inputName, minChars) => {
    return createValidationRule(
        'minLength',
        `${inputName} should contain at least ${minChars} characters.`,
        (inputValue) => inputValue.length >= minChars
    );
};

export const maxLengthRule = (inputName, maxChars) => {
    return createValidationRule(
        'maxLength',
        `${inputName} cannot contain more than ${maxChars} characters.`,
        (inputValue) => inputValue.length <= maxChars
    );
};

export const isEmailRule = () => {
    return createValidationRule(
        'isEmail',
        'Please enter a valid email address.',
        (inputValue) => validator.isEmail(inputValue)
    );
};
