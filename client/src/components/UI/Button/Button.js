import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button
            className={`${classes.button} ${
                props.size === 'large' ? classes.button_large : null
            } ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;
