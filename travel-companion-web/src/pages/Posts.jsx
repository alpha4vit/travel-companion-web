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
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FadeModalDialog from "../components/UI/MyModal/FadeModalDialog";

const Posts = ({isLoggedIn, isEmailVerified}) => {

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

    return (
        <div>
            {isResponseVisible &&
                <FadeModalDialog title="Откликнуться на объявление" open={isResponseVisible} setOpen={setResponseVisible}>
                    <ResponseForm callback={() => console.log(10)} setResponseVisible={setResponseVisible} responsedPostId={responsedPostId} />
                </FadeModalDialog>
            }
            {isLoggedIn && isEmailVerified &&
                <FadeModalDialog title="Создание объявления" open={isVisible} setOpen={setVisible}>
                    <PostCreationForm  posts={posts} setPosts={setPosts} setVisible={setVisible}/>
                </FadeModalDialog>
            }
            <SearchMenu
                filter={filter}
                setFilter={setFilter}/>
            {isLoggedIn && isEmailVerified &&
                <div style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                }}>
                    <Fab onClick={()=>setVisible(true)} color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </div>
            }
            {postError &&
                <h1 style={{marginTop: 50, textAlign:"center"}}>Произошла ошибка: {postError}</h1>
            }
            <PostList isLoggedIn={isLoggedIn} isEmailVerified={isEmailVerified} setResponsedPostId={setResponsedPostId} setResponseVisible={setResponseVisible} posts={sortedAndSearchedPost}/>
            <div ref={lastElement} style={{height: 20}}></div>
            {isPostsLoading &&
                <div style={{display: "flex", justifyContent: "center", marginTop: 50}}><Loader/></div>
            }

        </div>
    );
};

export default Posts;