import { useContext, useState } from 'react';

import LoginForm from '../components/Login/LoginForm/LoginForm';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../components/UI/Modal/Modal';
import AuthContext from '../store/auth-context';

import classes from './Login.module.css';

const Login = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const authCtx = useContext(AuthContext);

    const emailChangeHandler = (event) => {
        setEmailInput(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPasswordInput(event.target.value);
    };

    const submitFormHandler = (event) => {
        event.preventDefault();
        authCtx.loginHandler({ email: emailInput, password: passwordInput });
        setPasswordInput('');
    };

    return (
        <div className={classes.login}>
            {authCtx.error && (
                <Modal
                    title="Error"
                    content={authCtx.error}
                    dismissModalHandler={authCtx.dismissErrorHandler}
                />
            )}

            {authCtx.loading ? (
                <LoadingSpinner />
            ) : (
                <LoginForm
                    emailInput={emailInput}
                    passwordInput={passwordInput}
                    submitFormHandler={submitFormHandler}
                    emailChangeHandler={emailChangeHandler}
                    passwordChangeHandler={passwordChangeHandler}
                />
            )}
        </div>
    );
};

export default Login;
