import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import JokesContext from '../../store/jokes-context';
import Jokes from '../../components/Jokes/Jokes';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import AppMessage from '../../components/UI/AppMessage/AppMessage';

const Home = () => {
    const [isLoading, setIsLoading] = useState();
    const [errorOccurred, setErrorOccurred] = useState();
    const jokesCtx = useContext(JokesContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const { openJoke, jokes, loading, openNewJoke, getAllJokesHandler, error } =
        jokesCtx;

    useEffect(() => {
        if (!jokes && !loading && !error) {
            getAllJokesHandler();
        }
    }, [jokes, loading, error, getAllJokesHandler]);

    useEffect(() => {
        if (jokes) {
            if (id && id !== openJoke?._id) {
                openNewJoke(id);
            }

            if (!id && jokes.length > 0) {
                navigate(`/${jokes[0]._id}`);
            }
        }
    }, [openJoke, jokes, id, openNewJoke, navigate]);

    const deleteJoke = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/v1/jokes/${openJoke._id}`);
            jokesCtx.deleteJokeHandler(openJoke._id);
            navigate('/');
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setErrorOccurred(
                err.response?.data.message
                    ? err.response.data.message
                    : err.message
            );
        }
    };

    let errorComponent = null;

    if (jokesCtx.error)
        errorComponent = <Modal title="Error" content={jokesCtx.error} />;

    if (errorOccurred)
        errorComponent = <Modal title="Error" content={errorOccurred} />;

    return (
        <PageOffsetContainer>
            {errorComponent}
            {(jokesCtx.loading || isLoading) && <LoadingSpinner />}
            {jokesCtx.openJoke && !jokesCtx.error && !isLoading && (
                <Jokes deleteJoke={deleteJoke} />
            )}
            {!loading && jokes && jokes.length === 0 && !error && (
                <AppMessage message="No jokes found. Contact the (lazy-ass) admin of the site." />
            )}
        </PageOffsetContainer>
    );
};

export default Home;
