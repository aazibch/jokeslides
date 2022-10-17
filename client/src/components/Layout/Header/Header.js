import MainNavigation from './MainNavigation/MainNavigation';

import classes from './Header.module.css';
import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';

function Header() {
    const authCtx = useContext(AuthContext);

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <h1>JokeSlides</h1>
            </div>

            {authCtx.loggedInUser && <MainNavigation />}
        </header>
    );
}

export default Header;
