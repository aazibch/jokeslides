import classes from './Input.module.css';

const Input = (props) => {
    let errorMessage;

    if (props.error && props.touched) {
        errorMessage = <p className={classes.error}>{props.error}</p>;
    }

    let input = (
        <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.changeHandler}
            onBlur={props.blurHandler}
        />
    );

    if (props.type === 'textarea') {
        input = (
            <textarea
                id={props.id}
                value={props.value}
                onChange={props.changeHandler}
                onBlur={props.blurHandler}
            />
        );
    }

    return (
        <div className={`${classes.control} ${props.className}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {input}
            {errorMessage}
        </div>
    );
};

export default Input;
