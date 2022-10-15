import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JokesContext = createContext({
    jokesCount: 0,
    openJoke: {},
    loading: true,
    openNewJoke: (jokeId) => {},
    prevJokeHandler: () => {},
    nextJokeHandler: () => {}
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

    const navigate = useNavigate();

    useEffect(() => {
        const getJokes = async () => {
            const response = await axios.get('/api/v1/jokes/');

            const jokes = formatJokes(response.data.data);

            setJokes(jokes);
            setOpenJoke({ ...jokes[0] });
            setLoading(false);
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

    const context = {
        jokesCount: jokes?.length,
        openJoke: openJoke,
        loading: loading,
        openNewJoke: openNewJoke,
        prevJokeHandler: prevJokeHandler,
        nextJokeHandler: nextJokeHandler
    };

    return (
        <JokesContext.Provider value={context}>
            {props.children}
        </JokesContext.Provider>
    );
};

export default JokesContext;
