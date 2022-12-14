import { useState } from 'react';

const useForm = (formObj) => {
    const [form, setForm] = useState(formObj);

    const createFormInputs = () => {
        return Object.values(form).map((inputConfig) => {
            return inputConfig.createInput(
                inputChangeHandler,
                inputBlurHandler,
                inputConfig.value,
                inputConfig.touched,
                inputConfig.error
            );
        });
    };

    const updateFieldValidityState = (inputField) => {
        for (const rule of inputField.validationRules) {
            if (!rule.validate(inputField.value, form)) {
                inputField.valid = false;
                inputField.error = inputField.touched
                    ? rule.errorMessage
                    : null;
                return inputField;
            }
        }

        inputField.valid = true;
        inputField.error = null;
        return inputField;
    };

    const inputBlurHandler = (event) => {
        let inputObj = { ...form[event.target.id] };
        inputObj.touched = true;

        // Update validity state
        inputObj = updateFieldValidityState(inputObj);

        setForm({ ...form, [event.target.id]: inputObj });
    };

    const inputChangeHandler = (event) => {
        let inputObj = { ...form[event.target.id] };

        // Update value
        inputObj.value = event.target.value;

        // Update validity state

        inputObj = updateFieldValidityState(inputObj);

        setForm({ ...form, [event.target.id]: inputObj });
    };

    const getFormValues = () => {
        const formFieldNames = Object.keys(form);
        const formValues = {};

        for (let name of formFieldNames) {
            formValues[name] = form[name].value;
        }

        return formValues;
    };

    const isFormValid = (showErrorMessages = false) => {
        const inputs = Object.values(form);

        if (showErrorMessages) {
            const updatedForm = { ...form };

            const inputs = Object.keys(form);

            // when touched property is true, field error message is shown.
            inputs.forEach((inputName) => {
                const updatedField = {
                    ...updatedForm[inputName],
                    touched: true
                };

                updatedForm[inputName] = updatedField;
            });

            setForm(updatedForm);
        }

        return inputs.every((input) => input.valid === true);
    };

    return {
        createFormInputs,
        isFormValid,
        getFormValues
    };
};

export default useForm;
