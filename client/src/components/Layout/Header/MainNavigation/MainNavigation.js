import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import JokesContext from '../../../../store/jokes-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const jokesCtx = useContext(JokesContext);
    const location = useLocation();

    const assignClassNameForHome = (navData) => {
        const splitPathname = location.pathname.split('/');

        if (
            navData.isActive &&
            !jokesCtx.jokesLoading &&
            !jokesCtx.jokesError &&
            splitPathname.length < 3 &&
            splitPathname[1] !== 'create-new-joke'
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
                end
            >
                Create New Joke
            </NavLink>
            <NavLink to="/logout">Logout</NavLink>
        </nav>
    );
};

export default MainNavigation;
