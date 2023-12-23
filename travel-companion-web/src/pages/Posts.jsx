import React, {useEffect, useRef, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {PostService} from "../api/PostService";
import PostList from "../components/Posts/PostList";
import SearchMenu from "../components/SearchMenu/SearchMenu";
import {usePosts} from "../hooks/usePosts";
import Loader from "../components/UI/Loader/Loader";
import {getPagesCount} from "../utils/pages";
import PostCreationButton from "../components/UI/PostCreationButton/PostCreationButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostCreationForm from "../components/Posts/PostCreationForm";
import ResponseForm from "../components/Posts/ResponseForm";

const Posts = ({isLoggedIn}) => {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({query:"", sort:"", driverCheck: false, companionCheck: false});
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [isVisible, setVisible] = useState(false);
    const [isResponseVisible, setResponseVisible] = useState(false);
    const [responsedPostId, setResponsedPostId] = useState("");
    const sortedAndSearchedPost = usePosts(posts, filter.sort, filter.query, filter.driverCheck, filter.companionCheck);
    const lastElement = useRef();
    const observer = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data.body]);
        const totalCount = response.data.headers.total_count;
        setTotalPages(getPagesCount(totalCount, limit));
    });


    useEffect(() => {
        if(isPostsLoading) return;
        if(observer.current) observer.current.disconnect();
        var callback = function(entries, observer) {
            if (entries[0].isIntersecting && page < totalPages) {
                setPage(page+1);
            }
        }
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(lastElement.current);
    }, [isPostsLoading]);

    useEffect(() => {
        fetchPosts();
    }, [page]);



    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div>
            <SearchMenu
                filter={filter}
                setFilter={setFilter}/>
            {isLoggedIn &&
                <PostCreationButton setVisible={setVisible} />
            }
            {isLoggedIn &&
                <MyModal visible={isVisible} setVisible={setVisible}>
                    <PostCreationForm posts={posts} setPosts={setPosts} setVisible={setVisible}/>
                </MyModal>
            }
            {isResponseVisible &&
                <MyModal visible={isResponseVisible} setVisible={setResponseVisible}>
                    <ResponseForm setResponseVisible={setResponseVisible} responsedPostId={responsedPostId} />
                </MyModal>
            }
            {postError &&
                <h1 style={{marginTop: 50, textAlign:"center"}}>Произошла ошибка: {postError}</h1>
            }
            <PostList setResponsedPostId={setResponsedPostId} setResponseVisible={setResponseVisible} posts={sortedAndSearchedPost}/>
            <div ref={lastElement} style={{height: 20}}></div>
            {isPostsLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
            }

        </div>
    );
};

export default Posts;