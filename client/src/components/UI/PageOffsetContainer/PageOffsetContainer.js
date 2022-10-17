import classes from './PageOffsetContainer.module.css';

const PageOffsetContainer = (props) => {
    return <div className={classes.offsetContainer}>{props.children}</div>;
};

export default PageOffsetContainer;
