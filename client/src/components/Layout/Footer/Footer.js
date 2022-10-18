import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';
import classes from './Footer.module.css';

function Footer() {
    const authCtx = useContext(AuthContext);

    return (
        <footer className={classes.footer}>
            <div>
                <p>
                    Coded by{' '}
                    <a href="https://github.com/aazibch/">Aazib Chaudhry</a>.
                </p>
                <p>In tribute to Norm Macdonald.</p>
            </div>

            {authCtx.loggedInUser && (
                <p className={classes.loggedIn}>
                    Logged in as{' '}
                    <span className={classes.loggedInUser}>
                        {authCtx.loggedInUser.username}
                    </span>
                    .
                </p>
            )}
        </footer>
    );
}

export default Footer;
