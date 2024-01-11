import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {PostService} from "../../api/PostService"; // Подключите ваши стили
import classes from "./Post.module.css";
import MyModal from "../UI/MyModal/MyModal";
import ResponseForm from "./ResponseForm";
import {Col, Row, Typography} from "antd";

const Post = () => {

    const {postId} = useParams();

    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [isResponseVisible, setResponseVisible] = useState(false);
    const [responsedPostId, setResponsedPostId] = useState("");

    useEffect( () => {
        const fetch = async () => {
            const response = await PostService.getById(postId);
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
        <>
        <div className={classes.postPage}>

            {isResponseVisible &&
                <MyModal visible={isResponseVisible} setVisible={setResponseVisible}>
                    <ResponseForm setResponseVisible={setResponseVisible} responsedPostId={responsedPostId} callback={() => console.log(10)}/>
                </MyModal>
            }
            <div>{post.title}</div>
            <div style={{ marginTop: '10px' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Typography><i>Город отправления:</i> {post.route.departure.text}</Typography>
                        <Typography><i>Город прибытия:</i> {post.route.destination.text}</Typography>
                    </Col>
                    <Col xs={24} md={12}>
                        <Typography><i>Дата отправления:</i> {post.date_there}</Typography>
                        <Typography><i>Дата прибытия:</i> {post.date_back}</Typography>

                    </Col>
                </Row>
                <Typography><i>Описание:</i> {post.description}</Typography>
                <Typography><i>Стоимость:</i> {post.fee}</Typography>
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
            </>
    );
};

export default Post;
