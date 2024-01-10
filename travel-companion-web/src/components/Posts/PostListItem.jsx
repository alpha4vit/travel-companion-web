import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from "./Post.module.css";
import {Card, Skeleton, Divider, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import Button from "@mui/material/Button";
import {ImageService} from "../../api/ImageService";
import {Avatar} from "@mui/joy";

const PostListItem = ({post, setResponseVisible, setResponsedPostId, isLoggedIn, isEmailVerified, loading}) => {
    const user = JSON.parse(localStorage.getItem("authenticatedUser"));

    const [avatar, setAvatar] = useState("");


    useEffect(() => {
        const fetchAvatar = async () => {
            const response = await ImageService.fetchImage(post.user.avatar);
            setAvatar(response);
        }
        fetchAvatar();
    }, [])

    const navigateTo = useNavigate();

    const respond = (e) => {
        e.stopPropagation();
        setResponsedPostId(post.id);
        setResponseVisible(true);
    }

    return (
        <div key={post.id} className={classes.event}>
                <Card onClick={() => navigateTo(`/posts/${post.id}`, {state:{isEmailVerified: isEmailVerified, isLoggedIn: isLoggedIn}})}
                    hoverable
                    style={{
                        width: '50vw',
                        marginTop: 16,
                    }}
                    actions={isLoggedIn && [
                        <Button  variant="contained" type="button" onClick={(e) => respond(e)}>
                            Откликнуться!
                        </Button>
                    ]}
                >
                    <Skeleton loading={loading} avatar active>
                        <Meta
                            avatar={
                                <Avatar src={avatar} />
                            }
                            title={post.user.username}
                        />
                        <Divider>{post.post_type === 'DRIVER' ? 'Ищу попутчика' : 'Ищу попутку'}</Divider>
                        <div style={{marginTop:'10px'}}>
                            <Typography><i>Заголовок:</i> {post.title}</Typography>
                            <Typography><i>Дата отправления:</i> {post.date_there}</Typography>
                            <Typography><i>Дата прибытия:</i> {post.date_back}</Typography>
                            <Typography><i>Описание:</i> {post.description}</Typography>
                            <Typography><i>Стоимость:</i> {post.fee}</Typography>
                        </div>
                    </Skeleton>
                </Card>
        </div>
    );
};

export default PostListItem;