import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import Joke from './Joke/Joke';
import IconButton from '../UI/IconButton/IconButton';
import Button from '../UI/Button/Button';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';

import JokesContext from '../../store/jokes-context';

import classes from './Jokes.module.css';

const Jokes = () => {
    const jokesCtx = useContext(JokesContext);

    let content = '';

    if (jokesCtx.loading)
        content = (
            <div className={classes.jokes}>
                <LoadingSpinner />
            </div>
        );

    if (!jokesCtx.loading && !jokesCtx.error)
        content = (
            <div className={classes.jokes}>
                <div className={classes.jokesTop}>
                    <div className={classes.navButtonContainer}>
                        {jokesCtx.openJoke.position > 1 && (
                            <IconButton
                                onClick={jokesCtx.prevJokeHandler}
                                className={classes.navButton}
                            >
                                <FontAwesomeIcon icon={faCaretLeft} />
                            </IconButton>
                        )}
                    </div>

                    <Joke />
                    <div className={classes.navButtonContainer}>
                        {jokesCtx.openJoke.position !== jokesCtx.jokesCount && (
                            <IconButton
                                onClick={jokesCtx.nextJokeHandler}
                                className={classes.navButton}
                            >
                                <FontAwesomeIcon icon={faCaretRight} />
                            </IconButton>
                        )}
                    </div>
                </div>
                <div className={classes.jokesBottom}>
                    <p className={`${classes.jokeCount} text-muted`}>
                        {jokesCtx.openJoke.position} / {jokesCtx.jokesCount}
                    </p>
                    <Button onClick={jokesCtx.randomJokeHandler} size="large">
                        Random Joke
                    </Button>
                </div>
            </div>
        );

    return content;
};

export default Jokes;
