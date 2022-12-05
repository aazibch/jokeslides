import useForm from '../../../hooks/useForm';
import { loginForm } from '../../../utils/forms/formConfigs';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';

import classes from './LoginForm.module.css';

const LoginForm = (props) => {
    const {
        createFormInputs,
        isFormValid,
        getFormValues,
        updateFormFieldsToTouched
    } = useForm(loginForm);

    const onSubmit = (event) => {
        event.preventDefault();
        updateFormFieldsToTouched();

        if (!isFormValid()) {
            return;
        }

        props.submitFormHandler(getFormValues());
    };

    return (
        <Card className={classes.loginForm}>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                {createFormInputs()}
                <Button className={classes.loginButton}>Login</Button>
            </form>
        </Card>
    );
};

export default LoginForm;
