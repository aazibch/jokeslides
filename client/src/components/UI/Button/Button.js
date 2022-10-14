import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button
            className={`${classes.button} ${
                props.size === 'large' ? classes.button_large : null
            }`}
        >
            {props.children}
        </button>
    );
};

export default Button;
