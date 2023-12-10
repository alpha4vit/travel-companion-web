import React from 'react';
import PosListItem from "./PosListItem";
import classes from "./Post.module.css";

const PostList = ({posts}) => {

    return (
        <section className={classes.list}>
            {posts.map(post => (
                <PosListItem post={post}/>
            ))}
        </section>
    );
};

export default PostList;