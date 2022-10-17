import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    loggedInUser: null,
    loadingUser: true,
    loginHandler: (data) => {},
    logoutHandler: () => {}
});

export const AuthContextProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                const response = await axios('/api/v1/users/current');

                if (response.data.data) {
                    setLoggedInUser(response.data.data);
                }

                setLoadingUser(false);
            } catch (err) {
                setLoadingUser(false);
            }
        };

        getLoggedInUser();
    }, []);

    const loginHandler = async (data) => {
        setLoggedInUser(data);
    };

    const logoutHandler = async () => {
        setLoggedInUser(null);
    };

    const context = {
        loggedInUser: loggedInUser,
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

export default AuthContext;
