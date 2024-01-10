import React from 'react';
import PostListItem from "./PostListItem";
import classes from "./Post.module.css";
import {Empty} from "antd";

const PostList = ({posts, setResponseVisible, setResponsedPostId, isEmailVerified, isLoggedIn, isLoading}) => {


    return (
        <section className={classes.list}>
                {posts.map(post => (
                    <PostListItem loading={isLoading} isLoggedIn={isLoggedIn} isEmailVerified={isEmailVerified} setResponsedPostId={setResponsedPostId} setResponseVisible={setResponseVisible} key={post.id} post={post}/>
                ))}
            {posts.length === 0 && !isLoading &&
                <Empty description="Ничего не найдено!" style={{marginTop:'20px'}}/>
            }
        </section>
    );
};

export default PostList;