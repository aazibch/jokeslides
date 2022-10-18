import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import JokesContext from '../../../../store/jokes-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const jokesCtx = useContext(JokesContext);
    const location = useLocation();

    const splitPathname = location.pathname.split('/');

    const assignClassNameForHome = (navData) => {
        if (
            (navData.isActive &&
                !jokesCtx.loading &&
                !jokesCtx.error &&
                location.pathname !== '/create-new-joke') ||
            (splitPathname[2] && splitPathname[2] !== '/edit')
        ) {
            return classes.active;
        }

        return;
    };

    return (
        <nav className={classes.mainNavigation}>
            <NavLink to="/" className={assignClassNameForHome}>
                Home
            </NavLink>
            <NavLink
                to="/create-new-joke"
                className={(navData) =>
                    navData.isActive ? classes.active : ''
                }
            >
                Create New Joke
            </NavLink>
            <NavLink to="/logout">Logout</NavLink>
        </nav>
    );
};

export default MainNavigation;
