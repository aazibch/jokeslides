import Card from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import classes from './LoginForm.module.css';

const LoginForm = (props) => {
    return (
        <Card className={classes.loginForm}>
            <form onSubmit={props.submitFormHandler}>
                <h2>Login</h2>
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={props.emailInput}
                    onChange={props.emailChangeHandler}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={props.passwordInput}
                    onChange={props.passwordChangeHandler}
                />
                <Button className={classes.loginButton}>Login</Button>
            </form>
        </Card>
    );
};

export default LoginForm;
