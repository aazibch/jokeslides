import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';

import AuthContext from '../../store/auth-context';

const Logout = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const { sendRequest, error } = useHttp();

    const { logoutHandler } = authCtx;

    useEffect(() => {
        const logout = async () => {
            sendRequest({ url: '/api/v1/users/logout' }, () => {
                logoutHandler();
                navigate('/');
            });
        };

        logout();
    }, [sendRequest, logoutHandler, navigate]);

    const errorModalCloseHandler = () => {
        navigate('/');
    };

    console.log('error', error);

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
