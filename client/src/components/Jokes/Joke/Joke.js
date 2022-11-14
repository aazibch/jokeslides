import classes from './Joke.module.css';

const Joke = (props) => {
    return (
        <div className={classes.joke}>
            <div className={classes.content}>{props.openJoke.content}</div>
            {props.openJoke.source && (
                <p className={classes.source}>{props.openJoke.source}</p>
            )}
        </div>
    );
};

export default Joke;
