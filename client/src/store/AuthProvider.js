import axios from 'axios';
import { useCallback, useEffect, useReducer } from 'react';

import AuthContext from './auth-context';

const defaultAuthState = {
    loggedInUser: null,
    loadingUser: true
};

const authReducer = (state, action) => {
    if (action.type === 'SET_USER') {
        return {
            ...state,
            loggedInUser: action.user,
            loadingUser: false
        };
    }

    if (action.type === 'SET_LOADING_USER') {
        return {
            ...state,
            loadingUser: action.value
        };
    }

    return defaultAuthState;
};

export const AuthProvider = (props) => {
    const [authState, dispatchAuthAction] = useReducer(
        authReducer,
        defaultAuthState
    );

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await axios('/api/v1/users/current');

                if (response.data.data) {
                    dispatchAuthAction({
                        type: 'SET_USER',
                        user: response.data.data
                    });
                }

                dispatchAuthAction({ type: 'SET_LOADING_USER', value: false });
            } catch (err) {
                dispatchAuthAction({ type: 'SET_LOADING_USER', value: false });
            }
        };

        getLoggedInUser();
    }, []);

    const loginHandler = async (data) => {
        dispatchAuthAction({ type: 'SET_USER', user: data });
    };

    const logoutHandler = useCallback(async () => {
        dispatchAuthAction({ type: 'SET_USER', user: null });
    }, []);

    const context = {
        loggedInUser: authState.loggedInUser,
        loadingUser: authState.loadingUser,
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
