import {
    createFormFieldConfig,
    updateFormConfigValidationState
} from './helpers';
import {
    isEmailRule,
    minLengthRule,
    requiredRule
} from './inputValidationRules';

import jokeFormClasses from './jokeForm.module.css';

export const loginForm = updateFormConfigValidationState({
    email: {
        ...createFormFieldConfig('Email', 'email', 'email'),
        validationRules: [isEmailRule()]
    },
    password: {
        ...createFormFieldConfig('Password', 'password', 'password'),
        validationRules: [minLengthRule('Password', 8)]
    }
});

export const createJokeForm = (jokeValue, sourceValue) => {
    const formConfig = updateFormConfigValidationState({
        joke: {
            ...createFormFieldConfig(
                'Joke',
                'joke',
                'textarea',
                jokeValue,
                jokeFormClasses.jokeInput
            ),
            validationRules: [requiredRule('Joke')]
        },
        source: {
            ...createFormFieldConfig('Source', 'source', 'text', sourceValue),
            validationRules: []
        }
    });

    return formConfig;
};
