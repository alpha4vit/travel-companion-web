import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {PostService} from "../api/PostService";
import PostList from "../components/Posts/PostList";
import SearchMenu from "../components/SearchMenu/SearchMenu";
import {usePosts} from "../hooks/usePosts";

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({query:"", sort:"", driverCheck: false, companionCheck: false});
    const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query, filter.driverCheck, filter.companionCheck);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll();
        setPosts(response.data.sort((a, b) => a.title.localeCompare(b.title)));
    })

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <SearchMenu
                filter={filter}
                setFilter={setFilter}/>
            <PostList posts={sortedAndSearchedPost}/>
        </div>
    );
};

export default Posts;