import React from 'react';
import PosListItem from "./PosListItem";
import classes from "./Post.module.css";

const PostList = ({posts, setResponseVisible, setResponsedPostId}) => {


    return (
        <section className={classes.list}>
            {posts.map(post => (
                <PosListItem setResponsedPostId={setResponsedPostId} setResponseVisible={setResponseVisible} key={post.id} post={post}/>
            ))}
        </section>
    );
};

export default PostList;