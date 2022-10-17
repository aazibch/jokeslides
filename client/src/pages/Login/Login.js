import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../../components/Login/LoginForm/LoginForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import AuthContext from '../../store/auth-context';

const Login = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        try {
            setLoading(true);
            const response = await axios.post('/api/v1/users/login/', {
                email: emailInput,
                password: passwordInput
            });

            authCtx.loginHandler(response.data.data);
            navigate('/');
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(
                err.response?.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
        setPasswordInput('');
    };

    const dismissErrorHandler = () => {
        setError(null);
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

            {loading ? (
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
