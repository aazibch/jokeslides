import axios from 'axios';
import { createContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

const JokesContext = createContext({
    jokes: null,
    jokesCount: 0,
    openJoke: {},
    loading: false,
    error: null,
    openNewJoke: (jokeId) => {},
    prevJokeHandler: () => {},
    nextJokeHandler: () => {},
    randomJokeHandler: () => {},
    getAllJokesHandler: () => {},
    newJokeHandler: (data) => {},
    deleteJokeHandler: (id) => {},
    editJokeHandler: (data) => {},
    findJokeHelper: (id) => {}
});

const formatJokes = (jokes) => {
    let count = 0;
    const updatedJokes = jokes.map((joke) => {
        return { ...joke, position: ++count };
    });

    return updatedJokes;
};

const defaultJokesState = {
    loading: false,
    jokes: null,
    openJoke: null,
    error: null
};

const jokesReducer = (state, action) => {
    if (action.type === 'SET_LOADING') {
        return {
            ...state,
            loading: action.value
        };
    }

    if (action.type === 'SET_ALL_JOKES') {
        let jokes = state.jokes;
        let openJoke = state.openJoke;

        if (action.jokes.length > 0) {
            jokes = formatJokes(action.jokes);
            openJoke = { ...jokes[0] };
        }

        return {
            ...state,
            jokes,
            openJoke,
            loading: false
        };
    }

    if (action.type === 'SET_ERROR') {
        return {
            ...state,
            error: action.error,
            loading: false
        };
    }

    if (action.type === 'SET_OPEN_JOKE') {
        return {
            ...state,
            openJoke: action.openJoke
        };
    }

    if (action.type === 'ADD_NEW_JOKE') {
        if (!state.jokes) return state;

        let updatedJokes = [...state.jokes, action.newJoke];
        updatedJokes = formatJokes(updatedJokes);

        return {
            ...state,
            jokes: updatedJokes
        };
    }

    if (action.type === 'UPDATE_JOKE') {
        if (!state.jokes) return state;

        const existingJokeIndex = state.jokes.findIndex(
            (joke) => joke._id === action.updatedJoke._id
        );

        const updatedJoke = {
            ...action.updatedJoke
        };

        let updatedJokes = [...state.jokes];
        updatedJokes[existingJokeIndex] = updatedJoke;

        updatedJokes = formatJokes(updatedJokes);

        return {
            jokes: updatedJokes
        };
    }

    if (action.type === 'DELETE_JOKE') {
        let updatedJokes = state.jokes.filter(
            (joke) => joke._id !== action.jokeId
        );
        updatedJokes = formatJokes(updatedJokes);

        return {
            ...state,
            jokes: updatedJokes,
            openJoke: null
        };
    }

    return defaultJokesState;
};

export const JokesContextProvider = (props) => {
    const [jokesState, dispatchJokesAction] = useReducer(
        jokesReducer,
        defaultJokesState
    );

    const navigate = useNavigate();

    const getAllJokesHandler = async () => {
        try {
            dispatchJokesAction({ type: 'SET_LOADING', value: true });

            const response = await axios.get('/api/v1/jokes/');

            dispatchJokesAction({
                type: 'SET_ALL_JOKES',
                jokes: response.data.data
            });
        } catch (err) {
            dispatchJokesAction({
                type: 'SET_ERROR',
                error: err.response?.data.message
                    ? err.response.data.message
                    : err.message
            });
        }
    };

    const openNewJoke = (jokeId) => {
        const joke = jokesState.jokes.find((joke) => joke._id === jokeId);

        if (joke) {
            dispatchJokesAction({
                type: 'SET_OPEN_JOKE',
                openJoke: { ...joke }
            });
        } else {
            dispatchJokesAction({
                type: 'SET_ERROR',
                error: 'The page you are looking for does not exist.'
            });
        }
    };

    const newJokeHandler = (data) => {
        dispatchJokesAction({ type: 'ADD_NEW_JOKE', newJoke: data });

        navigate(`/${data._id}`);
    };

    const editJokeHandler = (data) => {
        dispatchJokesAction({ type: 'UPDATE_JOKE', updatedJoke: data });
    };

    const deleteJokeHandler = (id) => {
        dispatchJokesAction({ type: 'DELETE_JOKE', jokeId: id });
    };

    const nextJokeHandler = () => {
        let jokeIndex = jokesState.jokes.findIndex(
            (joke) => joke._id === jokesState.openJoke._id
        );

        navigate(`/${jokesState.jokes[++jokeIndex]._id}`);
    };

    const prevJokeHandler = () => {
        let jokeIndex = jokesState.jokes.findIndex(
            (joke) => joke._id === jokesState.openJoke._id
        );

        navigate(`/${jokesState.jokes[--jokeIndex]._id}`);
    };

    const randomJokeHandler = () => {
        const randomIndex = Math.floor(Math.random() * jokesState.jokes.length);
        const randomJoke = jokesState.jokes[randomIndex];

        navigate(`/${randomJoke._id}`);
    };

    const findJokeHelper = (id) => {
        const joke = jokesState.jokes.find((joke) => joke._id === id);

        return joke;
    };

    const context = {
        jokes: jokesState.jokes,
        jokesCount: jokesState.jokes?.length,
        openJoke: jokesState.openJoke,
        loading: jokesState.loading,
        error: jokesState.error,
        openNewJoke: openNewJoke,
        prevJokeHandler: prevJokeHandler,
        nextJokeHandler: nextJokeHandler,
        randomJokeHandler: randomJokeHandler,
        getAllJokesHandler: getAllJokesHandler,
        newJokeHandler: newJokeHandler,
        deleteJokeHandler: deleteJokeHandler,
        editJokeHandler: editJokeHandler,
        findJokeHelper: findJokeHelper
    };

    return (
        <JokesContext.Provider value={context}>
            {props.children}
        </JokesContext.Provider>
    );
};

export default JokesContext;
