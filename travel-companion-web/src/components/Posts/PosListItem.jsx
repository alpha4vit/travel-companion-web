import React from 'react';
import {Link} from "react-router-dom";
import classes from "./Post.module.css";

const PosListItem = ({post}) => {
    return (
        <div key={post.id} className={classes.event}>
            <Link to={`/posts/${post.id}`} className={classes.link}>
                <div className={classes.event__content}>
                    <h2 className={classes.event__title}>{post.title}</h2>
                    <p className={classes.event__description}>{post.description}</p>
                    <time className={classes.event__date}>{'Туда-обратно: ' + post.date_there + ' - '+ post.date_back}</time>
                    <p className={classes.event__fee}>{'Оплата: ' + post.fee}</p>
                </div>
            </Link>
        </div>
    );
};

export default PosListItem;