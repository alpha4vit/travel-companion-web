import React, {useEffect, useState} from 'react';
import classes from "./PostTemp.module.css";
import {Link, useParams} from "react-router-dom";
import {PostService} from "../../api/PostService";
import {ImageService} from "../../api/ImageService";
import {UserService} from "../../api/UserService";
import MyModal from "../UI/MyModal/MyModal";
import ResponseForm from "./ResponseForm";
import Button from '@mui/material/Button';
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import FadeModalDialog from "../UI/MyModal/FadeModalDialog";

const PostTemp = () => {

    const {postId} = useParams();

    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const [avatar, setAvatar] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isResponseVisible, setResponseVisible] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const response = await PostService.getById(postId);
            setPost(response)
            const userTemp = await UserService.getById(response.user.id);
            setUser(userTemp)
            const avatarTemp = await ImageService.fetchImage(response.user.avatar);
            setAvatar(avatarTemp);
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
            {isResponseVisible &&
                <FadeModalDialog title="Откликнуться на объявление" open={isResponseVisible}
                                 setOpen={setResponseVisible}>
                    <ResponseForm callback={() => setPost({...post, responses_count: post.responses_count + 1})}
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
                                    <span className={classes.ratingValue}><Rating
                                        name="text-feedback"
                                        value={user.rating}
                                        readOnly
                                        precision={0.01}
                                        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
                                    /></span>
                                </div>
                            </div>
                            <div className={classes.responsesCount}>
                                <p className={classes.responsesText}>Количество откликов: {post.responses_count}</p>
                                <p className={classes.responsesText}>Был в сети: 15:21</p>
                            </div>
                        </div>
                        <hr className={classes.hrDivider}/>
                    </div>
                    <div className={classes.adSection}>
                        <h2>{post.title}</h2>
                        <p className={classes.description}>{post.description}</p>

                        <div className={classes.tripInfo}>
                            <h4>Информация о поездке</h4>
                            <p>Маршрут: Город А - Город Б</p>
                            <p>Дата отправления: {post.date_there}</p>
                            <p>Дата возвращения: {post.date_back}</p>
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
