import React, {useState} from 'react';
import {Link} from "react-router-dom";
import classes from "./Post.module.css";
import FadeModalDialog from "../UI/MyModal/FadeModalDialog";
import ResponseForm from "./ResponseForm";
import Button from "@mui/material/Button";

const PostListItem = ({post, setResponseVisible, setResponsedPostId, isLoggedIn, isEmailVerified}) => {
    const user = JSON.parse(localStorage.getItem("authenticatedUser"));const [modal, setModal] = useState(false);

    const respond = () => {
        setResponsedPostId(post.id);
        setResponseVisible(true);
    }

    return (
        <div key={post.id} className={classes.event}>

            <Link to={`/posts/${post.id}`} state={{isEmailVerified: isEmailVerified, isLoggedIn: isLoggedIn}} className={classes.link}>
                <div className={classes.event__content}>
                    <h2 className={classes.event__title}>{post.title}</h2>
                    <p className={classes.event__description}>{post.description}</p>
                    <time className={classes.event__date}>{'Туда-обратно: ' + post.date_there + ' - '+ post.date_back}</time>
                    <p className={classes.event__fee}>{'Оплата: ' + post.fee}</p>
                </div>
            </Link>
            {isLoggedIn && isEmailVerified &&
                <div className={classes.responseButton}>
                    <Button onClick={() => respond()} variant="contained" >Откликнуться</Button>
                </div>
            }
        </div>
    );
};

export default PostListItem;