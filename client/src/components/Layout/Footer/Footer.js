import classes from './Footer.module.css';

function Footer() {
    return (
        <footer className={classes.footer}>
            <p>
                Coded by{' '}
                <a href='https://github.com/aazibch/'>Aazib Chaudhry</a>.
            </p>
        </footer>
    );
}

export default Footer;
