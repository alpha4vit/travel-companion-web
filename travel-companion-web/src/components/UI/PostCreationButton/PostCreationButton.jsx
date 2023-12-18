import React from 'react';
import classes from "./PostCreationButton.module.css"

const PostCreationButton = ({setVisible}) => {
    return (

        <div onClick={() => setVisible(true)} className={classes.floatingButton}>
            <img className={classes.icon} src="https://raw.githubusercontent.com/Iconscout/unicons/9a9c624319dc55170e3a1bdee83618c37844f485/svg/line/plus-circle.svg" />
        </div>
    );
};

export default PostCreationButton;