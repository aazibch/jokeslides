import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JokesContext = createContext({
    jokesCount: 0,
    openJoke: {},
    loading: true,
    error: null,
    openNewJoke: (jokeId) => {},
    prevJokeHandler: () => {},
    nextJokeHandler: () => {},
    randomJokeHandler: () => {}
});

const formatJokes = (jokes) => {
    let count = 0;
    const updatedJokes = jokes.map((joke) => {
        return { ...joke, position: ++count };
    });

    return updatedJokes;
};

export const JokesContextProvider = (props) => {
    const [loading, setLoading] = useState(true);
    const [jokes, setJokes] = useState(null);
    const [openJoke, setOpenJoke] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getJokes = async () => {
            try {
                const response = await axios.get('/api/v1/jokes/');

                const jokes = formatJokes(response.data.data);

                setJokes(jokes);
                setOpenJoke({ ...jokes[0] });
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(
                    err.response?.data.message
                        ? err.response.data.message
                        : err.message
                );
            }
        };

        getJokes();
    }, []);

    const openNewJoke = (jokeId) => {
        const joke = jokes.find((joke) => joke._id === jokeId);

        if (joke) {
            setOpenJoke({
                ...joke
            });
        }
    };

    const nextJokeHandler = () => {
        let jokeIndex = jokes.findIndex((joke) => joke._id === openJoke._id);

        navigate(`/${jokes[++jokeIndex]._id}`);
    };

    const prevJokeHandler = () => {
        let jokeIndex = jokes.findIndex((joke) => joke._id === openJoke._id);

        navigate(`/${jokes[--jokeIndex]._id}`);
    };

    const randomJokeHandler = () => {
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const randomJoke = jokes[randomIndex];

        navigate(`/${randomJoke._id}`);
    };

    const context = {
        jokesCount: jokes?.length,
        openJoke: openJoke,
        loading: loading,
        error: error,
        openNewJoke: openNewJoke,
        prevJokeHandler: prevJokeHandler,
        nextJokeHandler: nextJokeHandler,
        randomJokeHandler: randomJokeHandler
    };

    return (
        <JokesContext.Provider value={context}>
            {props.children}
        </JokesContext.Provider>
    );
};

export default JokesContext;
