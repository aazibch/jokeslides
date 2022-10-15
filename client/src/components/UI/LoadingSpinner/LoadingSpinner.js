import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
    return (
        <FontAwesomeIcon
            className={classes.loadingSpinner}
            icon={faCircleNotch}
            spin
        />
    );
};

export default LoadingSpinner;
