import { useReducer, useCallback } from 'react';

import JokesContext from './jokes-context';
import useHttp from '../hooks/useHttp';

const formatJokes = (jokes) => {
    let count = 0;
    const updatedJokes = jokes.map((joke) => {
        return { ...joke, position: ++count };
    });

    return updatedJokes;
};

const defaultJokesState = {
    jokes: null
};

const jokesReducer = (state, action) => {
    if (action.type === 'SET_ALL_JOKES') {
        let jokes = [];

        if (action.jokes.length > 0) {
            jokes = formatJokes(action.jokes);
        }

        return {
            ...state,
            jokes
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
            jokes: updatedJokes
        };
    }

    return defaultJokesState;
};

export const JokesProvider = (props) => {
    const [jokesState, dispatchJokesAction] = useReducer(
        jokesReducer,
        defaultJokesState
    );

    const {
        isLoading: jokesLoading,
        error: jokesError,
        sendRequest
    } = useHttp();

    const getAllJokesHandler = useCallback(async () => {
        sendRequest({ url: '/api/v1/jokes' }, (data) => {
            dispatchJokesAction({
                type: 'SET_ALL_JOKES',
                jokes: data.data
            });
        });
    }, [sendRequest]);

    const newJokeHandler = (data) => {
        dispatchJokesAction({ type: 'ADD_NEW_JOKE', newJoke: data });
    };

    const editJokeHandler = (data) => {
        dispatchJokesAction({ type: 'UPDATE_JOKE', updatedJoke: data });
    };

    const deleteJokeHandler = (id) => {
        dispatchJokesAction({ type: 'DELETE_JOKE', jokeId: id });
    };

    const findJokeHelper = useCallback(
        (id) => {
            const joke = jokesState.jokes.find((joke) => joke._id === id);

            return joke;
        },
        [jokesState.jokes]
    );

    const context = {
        jokes: jokesState.jokes,
        jokesCount: jokesState.jokes?.length,
        jokesError: jokesError,
        jokesLoading: jokesLoading,
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

export default JokesProvider;
