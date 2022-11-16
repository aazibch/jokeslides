import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import CreateEditJokeForm from '../../components/Jokes/CreateEditJokeForm/CreateEditJokeForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import JokesContext from '../../store/jokes-context';

const CreateNewJoke = () => {
    const [jokeInput, setJokeInput] = useState('');
    const [sourceInput, setSourceInput] = useState('');

    const { isLoading, error, dismissErrorHandler, sendRequest } = useHttp();
    const navigate = useNavigate();
    const jokesCtx = useContext(JokesContext);

    const submitFormHandler = async (event) => {
        event.preventDefault();

        const requestConfig = {
            url: '/api/v1/jokes/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                content: jokeInput,
                source: sourceInput
            }
        };

        const handleResponseCallback = (response) => {
            jokesCtx.newJokeHandler(response.data);
            navigate(`/${response.data._id}`);
        };

        sendRequest(requestConfig, handleResponseCallback);
    };

    const jokeChangeHandler = (event) => {
        setJokeInput(event.target.value);
    };

    const sourceChangeHandler = (event) => {
        setSourceInput(event.target.value);
    };

    let content = (
        <CreateEditJokeForm
            heading="Create New Joke"
            jokeInput={jokeInput}
            sourceInput={sourceInput}
            jokeChangeHandler={jokeChangeHandler}
            sourceChangeHandler={sourceChangeHandler}
            submitFormHandler={submitFormHandler}
        />
    );

    if (isLoading) content = <LoadingSpinner />;

    return (
        <PageOffsetContainer>
            {error && (
                <Modal
                    title="Error"
                    content={error}
                    dismissModalHandler={dismissErrorHandler}
                />
            )}
            {content}
        </PageOffsetContainer>
    );
};

export default CreateNewJoke;
