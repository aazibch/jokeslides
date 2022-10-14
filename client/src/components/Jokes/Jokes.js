import Joke from './Joke/Joke';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretLeft,
    faCaretRight,
    faShuffle
} from '@fortawesome/free-solid-svg-icons';
import IconButton from '../UI/IconButton/IconButton';
import Button from '../UI/Button/Button';

import classes from './Jokes.module.css';

const Jokes = () => {
    return (
        <div className={classes.jokes}>
            <div className={classes.jokesTop}>
                <IconButton className={classes.navButton}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </IconButton>
                <Joke />
                <IconButton className={classes.navButton}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </IconButton>
            </div>
            <div className={classes.jokesBottom}>
                <p className={`${classes.jokeCount} text-muted`}>10 / 15</p>
                <Button size="large">Random</Button>
            </div>
        </div>
    );
};

export default Jokes;
