import ReactDOM from 'react-dom';
import { CardHeader, CardContent, CardFooter } from '../Card/Card';
import Card from '../Card/Card';
import Backdrop from './Backdrop/Backdrop';
import Button from '../Button/Button';

import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.dismissModalHandler} />,
                document.querySelector('#backdrop-root')
            )}
            {ReactDOM.createPortal(
                <Card className={classes.modal}>
                    <CardHeader classname={classes.header}>
                        <h2 className={classes.heading}>{props.title}</h2>
                    </CardHeader>
                    <CardContent className={classes.content}>
                        <p>{props.content}</p>
                    </CardContent>
                    {props.dismissModalHandler && (
                        <CardFooter className={classes.footer}>
                            <Button
                                className={classes.closeButton}
                                onClick={props.dismissModalHandler}
                            >
                                Close
                            </Button>
                        </CardFooter>
                    )}
                </Card>,
                document.querySelector('#overlay-root')
            )}
        </>
    );
};

export default Modal;
