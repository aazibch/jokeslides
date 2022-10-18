import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JokesContext = createContext({
    jokes: null,
    jokesCount: 0,
    openJoke: {},
    loading: true,
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

export const JokesContextProvider = (props) => {
    const [loading, setLoading] = useState(false);
    const [jokes, setJokes] = useState(null);
    const [openJoke, setOpenJoke] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const getAllJokesHandler = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/v1/jokes/');

            const jokes = formatJokes(response.data.data);

            setJokes(jokes);
            if (jokes.length > 0) {
                setOpenJoke({ ...jokes[0] });
            }
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

    const openNewJoke = (jokeId) => {
        const joke = jokes.find((joke) => joke._id === jokeId);

        if (joke) {
            setOpenJoke({
                ...joke
            });
        } else {
            setError('The page you are looking for does not exist.');
        }
    };

    const newJokeHandler = (data) => {
        setJokes((prevJokes) => {
            if (prevJokes) {
                let jokes = [...prevJokes, data];
                jokes = formatJokes(jokes);
                return jokes;
            }

            return null;
        });

        navigate(`/${data._id}`);
    };

    const editJokeHandler = (data) => {
        setJokes((prevJokes) => {
            if (prevJokes) {
                let updatedJokes = prevJokes.map((joke) => {
                    if (joke._id === data._id) {
                        return data;
                    }

                    return joke;
                });

                updatedJokes = formatJokes(updatedJokes);
                return updatedJokes;
            }

            return null;
        });
        setOpenJoke(null);
    };

    const deleteJokeHandler = (id) => {
        setJokes((prevJokes) => {
            let updatedJokes = prevJokes.filter((joke) => joke._id !== id);
            updatedJokes = formatJokes(updatedJokes);

            return updatedJokes;
        });
        setOpenJoke(null);
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

    const findJokeHelper = (id) => {
        const joke = jokes.find((joke) => joke._id === id);

        return joke;
    };

    const context = {
        jokes: jokes,
        jokesCount: jokes?.length,
        openJoke: openJoke,
        loading: loading,
        error: error,
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
