import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';

import classes from './NewJokeForm.module.css';

const NewJokeForm = (props) => {
    return (
        <Card className={classes.newJokeForm}>
            <form onSubmit={props.submitFormHandler}>
                <Input
                    id="joke"
                    className={classes.jokeInput}
                    value={props.jokeInput}
                    label="Joke"
                    type="textarea"
                    onChange={props.jokeChangeHandler}
                />
                <Input
                    id="source"
                    label="Source"
                    type="text"
                    value={props.sourceInput}
                    onChange={props.sourceChangeHandler}
                />
                <Button className={classes.createButton}>Create</Button>
            </form>
        </Card>
    );
};

export default NewJokeForm;
