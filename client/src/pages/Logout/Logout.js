import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';

import AuthContext from '../../store/auth-context';

const Logout = () => {
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const { logoutHandler } = authCtx;

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get('/api/v1/users/logout/');
                logoutHandler();
                navigate('/');
            } catch (err) {
                setError(
                    err.response?.data.message
                        ? err.response.data.message
                        : err.message
                );
            }
        };

        logout();
    }, [logoutHandler, navigate]);

    const errorModalCloseHandler = () => {
        navigate('/');
    };

    if (error)
        return (
            <Modal
                title="Error"
                content={error}
                dismissModalHandler={errorModalCloseHandler}
            />
        );

    return (
        <PageOffsetContainer>
            <LoadingSpinner />
        </PageOffsetContainer>
    );
};

export default Logout;
