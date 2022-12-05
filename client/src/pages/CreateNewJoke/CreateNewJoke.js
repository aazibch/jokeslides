import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import useHttp from '../../hooks/useHttp';
import CreateEditJokeForm from '../../components/Jokes/CreateEditJokeForm/CreateEditJokeForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import JokesContext from '../../store/jokes-context';
import { createJokeForm } from '../../utils/forms/formConfigs';

const CreateNewJoke = () => {
    const { isLoading, error, dismissErrorHandler, sendRequest } = useHttp();
    const navigate = useNavigate();
    const jokesCtx = useContext(JokesContext);

    const submitFormHandler = async (data) => {
        const requestConfig = {
            url: '/api/v1/jokes/',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                content: data.joke,
                source: data.source
            }
        };

        const handleResponseCallback = (response) => {
            jokesCtx.newJokeHandler(response.data);
            navigate(`/${response.data._id}`);
        };

        sendRequest(requestConfig, handleResponseCallback);
    };

    let content = (
        <CreateEditJokeForm
            heading="Create New Joke"
            formConfig={createJokeForm()}
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
