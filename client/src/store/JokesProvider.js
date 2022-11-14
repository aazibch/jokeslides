import { useReducer, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    const getAllJokesHandler = useCallback(async () => {
        sendRequest({ url: '/api/v1/jokes' }, (data) => {
            dispatchJokesAction({
                type: 'SET_ALL_JOKES',
                jokes: data.data
            });
        });
    }, [sendRequest]);

    const openNewJoke = useCallback(
        (jokeId) => {
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
        },
        [jokesState.jokes]
    );

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
