import React, {useEffect, useState} from 'react';
import classes from "./PostTemp.module.css";
import {Link, useParams} from "react-router-dom";
import {PostService} from "../../api/PostService";
import {ImageService} from "../../api/ImageService";
import {UserService} from "../../api/UserService";
import ResponseForm from "./ResponseForm";
import Button from '@mui/material/Button';
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import FadeModalDialog from "../UI/MyModal/FadeModalDialog";
import {Col, message, Row, Typography} from "antd";
import MyMap from "../map/MyMap";
import {DateConverter} from "../../utils/DateConverter";

const PostTemp = () => {

    const {postId} = useParams();

    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState("");
    const [rating, setRating] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isResponseVisible, setResponseVisible] = useState(false);
    const [route, setRoute] = useState({});
    const [deparute, setDeparture] = useState("");
    const [destination, setDestination] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const successResponseMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Вы успешно откликнулись на объявление!'
        });
    };

    useEffect(() => {
        const fetch = async () => {
            const response = await PostService.getById(postId);
            setPost(response)
            setRoute(response.route);
            setDeparture(response.route.departure.text)
            setDestination(response.route.destination.text)
            await UserService.getById(response.user.id, (userTemp)=>{
                setUser(userTemp)
                setRating(userTemp.rating);
                const avatarTemp = ImageService.fetchImage(response.user.avatar, (resp) => setAvatar(resp));
            });

        }
        if (localStorage.getItem("authenticatedUser") == null)
            setIsAuthenticated(false);
        else {
            const authenticatedUser = JSON.parse(localStorage.getItem("authenticatedUser"));
            console.log(authenticatedUser)
            if (authenticatedUser.is_email_verified) {
                setIsEmailVerified(true);
                setIsAuthenticated(true);
            }
        }
        fetch();
    }, [])



    return (
        <div>
            {contextHolder}
            {isResponseVisible &&
                <FadeModalDialog title="Откликнуться на объявление" open={isResponseVisible}
                                 setOpen={setResponseVisible}>
                    <ResponseForm callback={() => {
                        setPost({...post, responses_count: post.responses_count + 1});
                        successResponseMessage();
                    }}
                                  setResponseVisible={setResponseVisible} responsedPostId={post.id}/>
                </FadeModalDialog>
            }
            <div className={classes.centeredContainer}>
                <div className={classes.adContainer}>
                    <div className={classes.userSection}>
                        <div className={classes.userInfo}>
                            <Link to={`/users/${user.id}`}>
                                <img src={avatar} alt="Аватар пользователя"
                                     className="img-fluid avatar-xxl rounded-circle mr-2"/>
                            </Link>

                            <div>
                                <h4>{user.username}</h4>
                                <div className={classes.userRating}>
                                    <span className={classes.ratingValue}>
                                        <Rating
                                            name="text-feedback"
                                            value={rating}
                                            readOnly
                                            precision={0.1}
                                            emptyIcon={<StarIcon style={{ opacity: 1}} fontSize="inherit" />}
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className={classes.responsesCount}>
                                <p className={classes.responsesText}>Количество откликов: {post.responses_count}</p>
                                <p className={classes.responsesText}>Дата публикации: {DateConverter.convertDateFull(post.creation_date)}</p>
                            </div>
                        </div>
                        <hr className={classes.hrDivider}/>
                    </div>
                    <div className={classes.adSection}>
                        <h2>{post.title}</h2>
                        <p className={classes.description}>{post.description}</p>
                        <div className={classes.tripInfo} style={{ marginTop: '10px' }}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={12}>
                                    <Typography><i>Город отправления:</i> {deparute}</Typography>
                                    <Typography><i>Город прибытия:</i> {destination}</Typography>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Typography><i>Дата отправления:</i> {DateConverter.convertDateSimple(post.date_there)}</Typography>
                                    <Typography><i>Дата прибытия:</i> {DateConverter.convertDateSimple(post.date_back)}</Typography>

                                </Col>
                            </Row>
                            <Typography><i>Описание:</i> {post.description}</Typography>
                            <Typography><i>Стоимость:</i> {post.fee}</Typography>
                            <hr className={classes.hrDivider}/>
                        </div>
                        {isEmailVerified && isAuthenticated &&
                            <hr className={classes.hrDivider}/>
                        }
                        {isEmailVerified && isAuthenticated &&
                            <Button onClick={() => setResponseVisible(true)} variant="contained" >Откликнуться</Button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostTemp;
