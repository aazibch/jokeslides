import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';

const AuthContext = createContext({
    loggedInUser: null,
    loadingUser: true,
    loginHandler: (data) => {},
    logoutHandler: () => {}
});

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

export const AuthContextProvider = (props) => {
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

    const logoutHandler = async () => {
        dispatchAuthAction({ type: 'SET_USER', user: null });
    };

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

export default AuthContext;
