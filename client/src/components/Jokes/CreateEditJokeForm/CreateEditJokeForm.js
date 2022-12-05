import Button from '../../UI/Button/Button';
import Card from '../../UI/Card/Card';
import useForm from '../../../hooks/useForm';

import classes from './CreateEditJokeForm.module.css';

const CreateEditJokeForm = (props) => {
    const { createFormInputs, isFormValid, getFormValues } = useForm(
        props.formConfig
    );

    const onSubmit = (event) => {
        event.preventDefault();

        if (!isFormValid(true)) {
            return;
        }

        props.submitFormHandler(getFormValues());
    };

    return (
        <Card className={classes.createEditJokeForm}>
            <form onSubmit={onSubmit}>
                <h2>{props.heading}</h2>
                {createFormInputs()}
                <Button className={classes.createButton}>Create</Button>
            </form>
        </Card>
    );
};

export default CreateEditJokeForm;
