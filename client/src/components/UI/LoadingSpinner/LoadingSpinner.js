import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import classes from './LoadingSpinner.module.css';

const LoadingSpinner = (props) => {
    return (
        <FontAwesomeIcon
            className={`${classes.loadingSpinner} ${props.className}`}
            icon={faCircleNotch}
            spin
        />
    );
};

export default LoadingSpinner;
