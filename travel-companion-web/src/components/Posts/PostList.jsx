import React from 'react';
import PostListItem from "./PostListItem";
import classes from "./Post.module.css";

const PostList = ({posts, setResponseVisible, setResponsedPostId, isEmailVerified, isLoggedIn}) => {


    return (
        <section className={classes.list}>
            {posts.map(post => (
                <PostListItem isLoggedIn={isLoggedIn} isEmailVerified={isEmailVerified} setResponsedPostId={setResponsedPostId} setResponseVisible={setResponseVisible} key={post.id} post={post}/>
            ))}
        </section>
    );
};

export default PostList;