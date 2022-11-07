import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import CreateEditJokeForm from '../../components/Jokes/CreateEditJokeForm/CreateEditJokeForm';
import Modal from '../../components/UI/Modal/Modal';

import JokesContext from '../../store/jokes-context';

const EditPage = () => {
    const [jokeId, setJokeId] = useState('');
    const [jokeContent, setJokeContent] = useState('');
    const [jokeSource, setJokeSource] = useState('');
    const [isLoading, setIsLoading] = useState(null);
    const [errorOccurred, setErrorOccurred] = useState(null);

    const navigate = useNavigate();

    const jokesCtx = useContext(JokesContext);
    const {
        openJoke,
        jokes,
        loading,
        error,
        getAllJokesHandler,
        openNewJoke,
        findJokeHelper
    } = jokesCtx;
    const { id } = useParams();

    useEffect(() => {
        // Get jokes if not there already
        // Necessary to fetch the details for the joke editing
        // For all the jokes are fetched together.
        if (!jokes && !loading && !error) {
            getAllJokesHandler();
        }
    }, [jokes, loading, error, getAllJokesHandler]);

    useEffect(() => {
        // If jokes have been loaded,
        // add the joke based on the id from url to the state.
        if (jokes) {
            // Id doesn't match jokeId or id/jokeId does not exist
            // Find joke and add.
            if (id && id !== jokeId) {
                const jokeToEdit = findJokeHelper(id);
                // If joke found, meaning the id given in the url was accurate
                // Add the joke to state
                if (jokeToEdit) {
                    setJokeId(jokeToEdit._id);
                    setJokeContent(jokeToEdit.content);
                    setJokeSource(jokeToEdit.source);
                } else {
                    setErrorOccurred({
                        message: 'The page you are looking for does not exist.',
                        dismissable: false
                    });
                }
            }
        }
    }, [openJoke, jokes, id, jokeId, openNewJoke, findJokeHelper]);

    const jokeContentChangeHandler = (event) => {
        setJokeContent(event.target.value);
    };

    const jokeSourceChangeHandler = (event) => {
        setJokeSource(event.target.value);
    };

    const dismissErrorModalHandler = () => {
        setErrorOccurred(null);
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/v1/jokes/${jokeId}`, {
                content: jokeContent,
                source: jokeSource
            });
            jokesCtx.editJokeHandler(response.data.data);
            setIsLoading(false);
            navigate(`/${response.data.data._id}`);
        } catch (err) {
            setIsLoading(false);
            setErrorOccurred({
                message: err.response?.data.message
                    ? err.response.data.message
                    : err.message,
                dismissable: true
            });
        }
    };

    let content = (
        <CreateEditJokeForm
            submitFormHandler={submitFormHandler}
            heading="Edit Joke"
            jokeInput={jokeContent}
            sourceInput={jokeSource}
            jokeChangeHandler={jokeContentChangeHandler}
            sourceChangeHandler={jokeSourceChangeHandler}
        />
    );

    if (loading || isLoading) content = <LoadingSpinner />;

    if (errorOccurred)
        content = (
            <Modal
                title="Error"
                content={errorOccurred.message}
                dismissModalHandler={
                    errorOccurred.dismissable ? dismissErrorModalHandler : null
                }
            />
        );

    if (error) content = <Modal title="Error" content={error} />;

    return <PageOffsetContainer>{content}</PageOffsetContainer>;
};

export default EditPage;
