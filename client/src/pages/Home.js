import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import JokesContext from '../store/jokes-context';
import Jokes from '../components/Jokes/Jokes';
import Modal from '../components/UI/Modal/Modal';

const Home = () => {
    const jokesCtx = useContext(JokesContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, openJoke, openNewJoke, error } = jokesCtx;

    useEffect(() => {
        if (!loading && !error) {
            if (!id) {
                navigate(`/${openJoke._id}`);
            }

            if (id !== openJoke._id) {
                openNewJoke(id);
            }
        }
    }, [id, loading, openJoke, navigate, openNewJoke, error]);

    return (
        <>
            {jokesCtx.error && <Modal title="Error" content={jokesCtx.error} />}
            <Jokes />
        </>
    );
};

export default Home;
