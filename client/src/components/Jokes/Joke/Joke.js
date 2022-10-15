import { useContext } from 'react';

import JokesContext from '../../../store/jokes-context';

import classes from './Joke.module.css';

const Joke = () => {
    const jokesCtx = useContext(JokesContext);

    return (
        <div className={classes.joke}>
            <div className={classes.content}>{jokesCtx.openJoke.content}</div>
            <p className={classes.source}>{jokesCtx.openJoke.source}</p>
        </div>
    );
};

export default Joke;
