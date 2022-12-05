import Input from '../../components/UI/Input/Input';

export const createValidationRule = (name, errorMessage, validationFunc) => {
    return {
        name,
        errorMessage,
        validate: validationFunc
    };
};

export const createFormFieldConfig = (
    label,
    id,
    type,
    defaultValue = '',
    className
) => {
    return {
        createInput: (changeHandler, blurHandler, value, touched, error) => {
            return (
                <Input
                    key={id}
                    id={id}
                    className={className}
                    type={type}
                    label={label}
                    value={value}
                    touched={touched}
                    changeHandler={changeHandler}
                    blurHandler={blurHandler}
                    error={error}
                />
            );
        },
        label,
        value: defaultValue,
        valid: false,
        error: null,
        touched: false
    };
};

export const updateFormConfigValidationState = (formConfig) => {
    const updatedFormConfig = formConfig;
    const fieldNames = Object.keys(formConfig);

    for (let field of fieldNames) {
        if (formConfig[field].validationRules.length === 0) {
            updatedFormConfig[field].valid = true;
        } else {
            for (const rule of formConfig[field].validationRules) {
                if (!rule.validate(formConfig[field].value, formConfig)) {
                    updatedFormConfig[field].valid = false;
                    updatedFormConfig[field].error = rule.errorMessage;
                    break;
                }

                updatedFormConfig[field].valid = true;
                updatedFormConfig[field].error = null;
            }
        }
    }

    return updatedFormConfig;
};
