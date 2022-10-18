import classes from './AppMessage.module.css';

const AppMessage = (props) => {
    return (
        <div className={classes.appMessage}>
            <p>{props.message}</p>
        </div>
    );
};

export default AppMessage;
