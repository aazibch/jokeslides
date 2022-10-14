import classes from './Joke.module.css';

const Joke = () => {
    return (
        <div className={classes.joke}>
            <div className={classes.content}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lacus vel facilisis volutpat est velit egestas dui id. Cursus
                sit amet dictum sit.
            </div>
            <p className={classes.source}>Norm Macdonald</p>
        </div>
    );
};

export default Joke;
