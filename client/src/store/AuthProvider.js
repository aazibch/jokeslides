import useHttp from '../hooks/useHttp';
import { useCallback, useEffect, useReducer } from 'react';

import AuthContext from './auth-context';

const defaultAuthState = {
    loggedInUser: null
};

const authReducer = (state, action) => {
    if (action.type === 'SET_USER') {
        return {
            ...state,
            loggedInUser: action.user
        };
    }

    return defaultAuthState;
};

export const AuthProvider = (props) => {
    const [authState, dispatchAuthAction] = useReducer(
        authReducer,
        defaultAuthState
    );

    const { sendRequest, isLoading: loadingUser } = useHttp();

    useEffect(() => {
        const getLoggedInUser = async () => {
            sendRequest({ url: '/api/v1/users/current' }, (response) => {
                if (response.data) {
                    dispatchAuthAction({
                        type: 'SET_USER',
                        user: response.data
                    });
                }
            });
        };

        getLoggedInUser();
    }, [sendRequest]);

    const loginHandler = async (data) => {
        dispatchAuthAction({ type: 'SET_USER', user: data });
    };

    const logoutHandler = useCallback(async () => {
        dispatchAuthAction({ type: 'SET_USER', user: null });
    }, []);

    const context = {
        loggedInUser: authState.loggedInUser,
        loadingUser: loadingUser,
        loginHandler: loginHandler,
        logoutHandler: logoutHandler
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
