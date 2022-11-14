import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import Joke from './Joke/Joke';
import IconButton from '../UI/IconButton/IconButton';
import JokeControlBar from './JokeControlBar/JokeControlBar';

import JokesContext from '../../store/jokes-context';

import classes from './Jokes.module.css';

const Jokes = (props) => {
    const jokesCtx = useContext(JokesContext);

    return (
        <div className={classes.jokes}>
            <div className={classes.jokesTop}>
                <div className={classes.navButtonContainer}>
                    {props.openJoke.position > 1 && (
                        <IconButton
                            onClick={props.prevJokeHandler}
                            className={classes.navButton}
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                        </IconButton>
                    )}
                </div>

                <Joke openJoke={props.openJoke} />
                <div className={classes.navButtonContainer}>
                    {props.openJoke.position !== jokesCtx.jokesCount && (
                        <IconButton
                            onClick={props.nextJokeHandler}
                            className={classes.navButton}
                        >
                            <FontAwesomeIcon icon={faCaretRight} />
                        </IconButton>
                    )}
                </div>
            </div>
            <div className={classes.jokesBottom}>
                <p className={`${classes.jokeCount} text-muted`}>
                    {props.openJoke.position} / {jokesCtx.jokesCount}
                </p>
                <JokeControlBar deleteJokeHandler={props.deleteJokeHandler} />
            </div>
        </div>
    );
};

export default Jokes;
