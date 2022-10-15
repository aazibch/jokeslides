import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    loggedInUser: null,
    error: null,
    loading: false,
    loginHandler: (data) => {},
    dismissErrorHandler: () => {}
});

export const AuthContextProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const loginHandler = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/v1/users/login/', data);

            setLoggedInUser(response.data.data);
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
    };

    const dismissErrorHandler = () => {
        setError(null);
    };

    const context = {
        loggedInUser: loggedInUser,
        error: error,
        loading: loading,
        loginHandler: loginHandler,
        dismissErrorHandler: dismissErrorHandler
    };

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
