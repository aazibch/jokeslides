import classes from './Header.module.css';

function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <h1>JokeSlides</h1>
            </div>
        </header>
    );
}

export default Header;
