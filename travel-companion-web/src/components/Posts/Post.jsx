import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {PostService} from "../../api/PostService"; // Подключите ваши стили
import classes from "./Post.module.css";
import MyModal from "../UI/MyModal/MyModal";
import ResponseForm from "./ResponseForm";

const Post = () => {

    const {postId} = useParams();

    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [isResponseVisible, setResponseVisible] = useState(false);
    const [responsedPostId, setResponsedPostId] = useState("");

    useEffect( () => {
        const fetch = async () => {
            const response = await PostService.getById(postId);
            console.log(response)
            setPost(response);
            setUser(response.user);
        }
        fetch();
    }, [])


    const respond = () => {
        setResponsedPostId(post.id);
        setResponseVisible(true);
    }

    if (!post || !user) {
        return <div>Пост не найден</div>;
    }

    return (
        <div className={classes.postPage}>
            {isResponseVisible &&
                <MyModal visible={isResponseVisible} setVisible={setResponseVisible}>
                    <ResponseForm setResponseVisible={setResponseVisible} responsedPostId={responsedPostId} />
                </MyModal>
            }
            <div>{post.title}</div>
            <div className={classes.postInfo}>
                <h2 className={classes.postTitle}>{post.title}</h2>
                <p className={classes.postDescription}>{post.description}</p>
                <p className={classes.postDate}>{`Туда-обратно: ${post.date_there} - ${post.date_back}`}</p>
                <p className={classes.postFee}>{`Оплата: ${post.fee}`}</p>
            </div>

            <div className={classes.userInfo}>
                <Link to={`/users/${user.id}`}>
                    <h3 className={classes.username}>{user.username}</h3>
                </Link>
                <p className={classes.userEmail}>{`Email: ${user.email}`}</p>
            </div>
            <div className={classes.responseButton}>
                <button onClick={() => respond()} className={classes.responseButton__btn}>Откликнуться</button>
            </div>
        </div>
    );
};

export default Post;
