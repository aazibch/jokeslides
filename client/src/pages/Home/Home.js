import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import JokesContext from '../../store/jokes-context';
import useHttp from '../../hooks/useHttp';
import Jokes from '../../components/Jokes/Jokes';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import AppMessage from '../../components/UI/AppMessage/AppMessage';

const Home = () => {
    const [openJoke, setOpenJoke] = useState(null);
    const [noPageError, setNoPageError] = useState(null);
    const jokesCtx = useContext(JokesContext);
    const navigate = useNavigate();
    const {
        sendRequest,
        isLoading: httpLoading,
        error: httpError,
        dismissErrorHandler: dismissHttpErrorHandler
    } = useHttp();
    const { id } = useParams();

    const {
        jokes,
        jokesError,
        jokesLoading,
        getAllJokesHandler,
        findJokeHelper
    } = jokesCtx;

    useEffect(() => {
        if (!jokes && !jokesLoading && !jokesError) {
            getAllJokesHandler();
        }
    }, [jokes, jokesLoading, jokesError, getAllJokesHandler]);

    useEffect(() => {
        if (jokes) {
            if (id && id !== openJoke?._id) {
                const joke = findJokeHelper(id);

                if (!joke) {
                    return setNoPageError(
                        'The page you are looking for does not exist.'
                    );
                }

                setOpenJoke(joke);
            }

            if (!id && jokes) {
                navigate(`/${jokes[0]._id}`);
            }
        }
    }, [openJoke, jokes, id, findJokeHelper, navigate]);

    const prevJokeHandler = () => {
        let jokeIndex = jokes.findIndex((joke) => joke._id === openJoke._id);

        navigate(`/${jokes[--jokeIndex]._id}`);
    };

    const nextJokeHandler = () => {
        let jokeIndex = jokes.findIndex((joke) => joke._id === openJoke._id);

        navigate(`/${jokes[++jokeIndex]._id}`);
    };

    const deleteJokeHandler = async () => {
        sendRequest(
            { url: `/api/v1/jokes/${openJoke._id}`, method: 'DELETE' },
            () => {
                jokesCtx.deleteJokeHandler(openJoke._id);
                navigate('/');
            }
        );
    };

    const editJokeHandler = () => {
        navigate(`/${openJoke._id}/edit`);
    };

    let content = <LoadingSpinner />;

    if (openJoke) {
        content = (
            <Jokes
                editJokeHandler={editJokeHandler}
                prevJokeHandler={prevJokeHandler}
                nextJokeHandler={nextJokeHandler}
                openJoke={openJoke}
                deleteJokeHandler={deleteJokeHandler}
            />
        );
    }

    if (jokes?.length === 0 && !jokesLoading)
        content = (
            <AppMessage message="No jokes found. Contact the admin of the site." />
        );

    if (jokesError) content = <Modal title="Error" content={jokesError} />;

    if (noPageError) content = <Modal title="Error" content={noPageError} />;

    if (httpLoading) content = <LoadingSpinner />;

    return (
        <PageOffsetContainer>
            {httpError && (
                <Modal
                    title="Error"
                    content={httpError}
                    dismissModalHandler={dismissHttpErrorHandler}
                />
            )}
            {content}
        </PageOffsetContainer>
    );
};

export default Home;
