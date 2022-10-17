import classes from './Input.module.css';

const Input = (props) => {
    let input = (
        <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
        />
    );

    if (props.type === 'textarea')
        input = (
            <textarea
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            />
        );

    return (
        <div className={`${classes.control} ${props.className}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {input}
        </div>
    );
};

export default Input;
