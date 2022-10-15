import classes from './IconButton.module.css';

const IconButton = (props) => {
    return (
        <button
            className={`${classes.iconButton} ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default IconButton;
