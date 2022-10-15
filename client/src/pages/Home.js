import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import JokesContext from '../store/jokes-context';
import Jokes from '../components/Jokes/Jokes';

const Home = () => {
    const jokesCtx = useContext(JokesContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, openJoke, openNewJoke } = jokesCtx;

    useEffect(() => {
        if (!loading) {
            if (!id) {
                navigate(`/${openJoke._id}`);
            }

            if (id !== openJoke._id) {
                openNewJoke(id);
            }
        }
    }, [id, loading, openJoke, navigate, openNewJoke]);

    return <Jokes />;
};

export default Home;
