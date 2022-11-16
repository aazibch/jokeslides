import { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import CreateEditJokeForm from '../../components/Jokes/CreateEditJokeForm/CreateEditJokeForm';
import Modal from '../../components/UI/Modal/Modal';

import JokesContext from '../../store/jokes-context';

const EditPage = () => {
    const [jokeId, setJokeId] = useState('');
    const [jokeContent, setJokeContent] = useState('');
    const [jokeSource, setJokeSource] = useState('');
    const [noPageError, setNoPageError] = useState(null);

    const navigate = useNavigate();
    const {
        sendRequest,
        isLoading: httpLoading,
        error: httpError,
        dismissErrorHandler: dismissHttpErrorHandler
    } = useHttp();

    const jokesCtx = useContext(JokesContext);
    const {
        jokes,
        jokesLoading,
        jokesError,
        getAllJokesHandler,
        findJokeHelper
    } = jokesCtx;
    const { id } = useParams();

    useEffect(() => {
        // Get jokes if not there already
        // Necessary to fetch the details for the joke editing
        // For all the jokes are fetched together.
        if (!jokes && !jokesLoading && !jokesError) {
            getAllJokesHandler();
        }
    }, [jokes, jokesLoading, jokesError, getAllJokesHandler]);

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
                    setNoPageError(
                        'The page you are looking for does not exist.'
                    );
                }
            }
        }
    }, [jokes, id, jokeId, findJokeHelper]);

    const jokeContentChangeHandler = (event) => {
        setJokeContent(event.target.value);
    };

    const jokeSourceChangeHandler = (event) => {
        setJokeSource(event.target.value);
    };

    const submitFormHandler = async (event) => {
        event.preventDefault();

        const requestConfig = {
            url: `/api/v1/jokes/${jokeId}`,
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: {
                content: jokeContent,
                source: jokeSource
            }
        };

        const handleResponseCallback = (response) => {
            jokesCtx.editJokeHandler(response.data);
            navigate(`/${response.data._id}`);
        };

        sendRequest(requestConfig, handleResponseCallback);
    };

    let content = <LoadingSpinner />;

    if (jokesError) content = <Modal title="Error" content={jokesError} />;

    if (noPageError) content = <Modal title="Error" content={noPageError} />;

    if (jokeId) {
        content = (
            <CreateEditJokeForm
                submitFormHandler={submitFormHandler}
                heading="Edit Joke"
                jokeInput={jokeContent}
                sourceInput={jokeSource}
                jokeChangeHandler={jokeContentChangeHandler}
                sourceChangeHandler={jokeSourceChangeHandler}
            />
        );
    }

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

export default EditPage;
