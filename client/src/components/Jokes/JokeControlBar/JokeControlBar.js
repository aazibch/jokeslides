import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import Modal from '../../UI/Modal/Modal';

import AuthContext from '../../../store/auth-context';
import JokesContext from '../../../store/jokes-context';

import classes from './JokeControlBar.module.css';

const JokeControlBar = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const jokesCtx = useContext(JokesContext);
    const authCtx = useContext(AuthContext);

    const navigate = useNavigate();

    const deleteButtonHandler = () => {
        setShowDeleteModal(true);
    };

    const dismissDeleteModalHandler = () => {
        setShowDeleteModal(false);
    };

    const confirmDeleteModalHandler = () => {
        setShowDeleteModal(false);
        props.deleteJokeHandler();
    };

    const randomJokeHandler = () => {
        const randomIndex = Math.floor(Math.random() * jokesCtx.jokesCount);
        const randomJoke = jokesCtx.jokes[randomIndex];

        navigate(`/${randomJoke._id}`);
    };

    return (
        <>
            {showDeleteModal && (
                <Modal
                    title="Delete joke?"
                    content="Are you sure you want to delete the joke?"
                    dismissModalHandler={dismissDeleteModalHandler}
                    confirmModalHandler={confirmDeleteModalHandler}
                />
            )}
            <div className={classes.controlBar}>
                <Button onClick={randomJokeHandler} size="large">
                    Random Joke
                </Button>
                {authCtx.loggedInUser && (
                    <>
                        <Button size="large" onClick={props.editJokeHandler}>
                            Edit
                        </Button>
                        <Button size="large" onClick={deleteButtonHandler}>
                            Delete
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};

export default JokeControlBar;
