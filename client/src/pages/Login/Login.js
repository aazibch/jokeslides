import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../../components/Login/LoginForm/LoginForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import useHttp from '../../hooks/useHttp';
import AuthContext from '../../store/auth-context';

const Login = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const { isLoading, error, dismissErrorHandler, sendRequest } = useHttp();

    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const emailChangeHandler = (event) => {
        setEmailInput(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPasswordInput(event.target.value);
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();

        const requestConfig = {
            url: '/api/v1/users/login/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: emailInput,
                password: passwordInput
            }
        };

        const handleResponseCallback = (response) => {
            authCtx.loginHandler(response.data);
            navigate('/');
        };

        await sendRequest(requestConfig, handleResponseCallback);
        setPasswordInput('');
    };

    return (
        <PageOffsetContainer>
            {error && (
                <Modal
                    title="Error"
                    content={error}
                    dismissModalHandler={dismissErrorHandler}
                />
            )}

            {isLoading ? (
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
        </PageOffsetContainer>
    );
};

export default Login;
