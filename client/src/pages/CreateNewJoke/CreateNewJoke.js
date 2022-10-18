import { useContext, useState } from 'react';
import axios from 'axios';
import CreateEditJokeForm from '../../components/Jokes/CreateEditJokeForm/CreateEditJokeForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import Modal from '../../components/UI/Modal/Modal';
import PageOffsetContainer from '../../components/UI/PageOffsetContainer/PageOffsetContainer';
import JokesContext from '../../store/jokes-context';

const CreateNewJoke = () => {
    const [jokeInput, setJokeInput] = useState('');
    const [sourceInput, setSourceInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const jokesCtx = useContext(JokesContext);

    const submitFormHandler = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post('/api/v1/jokes/', {
                content: jokeInput,
                source: sourceInput
            });

            jokesCtx.newJokeHandler(response.data.data);

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

    const jokeChangeHandler = (event) => {
        setJokeInput(event.target.value);
    };

    const sourceChangeHandler = (event) => {
        setSourceInput(event.target.value);
    };

    const dismissErrorModalHandler = () => {
        setError(null);
    };

    return (
        <PageOffsetContainer>
            {error && (
                <Modal
                    title="Error"
                    content={error}
                    dismissModalHandler={dismissErrorModalHandler}
                />
            )}
            {loading ? (
                <LoadingSpinner />
            ) : (
                <CreateEditJokeForm
                    heading="Create New Joke"
                    jokeInput={jokeInput}
                    sourceInput={sourceInput}
                    jokeChangeHandler={jokeChangeHandler}
                    sourceChangeHandler={sourceChangeHandler}
                    submitFormHandler={submitFormHandler}
                />
            )}
        </PageOffsetContainer>
    );
};

//@todo
// Add handler to cancel error model.

export default CreateNewJoke;