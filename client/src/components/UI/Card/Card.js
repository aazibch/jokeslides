import classes from './Card.module.css';

export const CardHeader = (props) => {
    return <div className={classes.header}>{props.children}</div>;
};

export const CardContent = (props) => {
    return <div className={classes.content}>{props.children}</div>;
};

export const CardFooter = (props) => {
    return <div className={classes.footer}>{props.children}</div>;
};

function Card(props) {
    return (
        <div className={classes.card + ' ' + props.className}>
            {props.children}
        </div>
    );
}

export default Card;
