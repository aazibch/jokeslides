import { createContext } from 'react';

const AuthContext = createContext({
    loggedInUser: null,
    loadingUser: true,
    loginHandler: (data) => {},
    logoutHandler: () => {}
});

export default AuthContext;
