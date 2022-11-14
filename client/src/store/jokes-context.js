import { createContext } from 'react';

const JokesContext = createContext({
    jokes: null,
    jokesCount: 0,
    openNewJoke: (jokeId) => {},
    getAllJokesHandler: () => {},
    newJokeHandler: (data) => {},
    deleteJokeHandler: (id) => {},
    editJokeHandler: (data) => {},
    findJokeHelper: (id) => {}
});

export default JokesContext;
