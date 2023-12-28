import React, {useEffect, useState} from 'react';
import classes from "./CardAbout.module.css";
import {UserService} from "../../api/UserService";
import {ImageService} from "../../api/ImageService";

const Review = ({review, showDivider}) => {

    const [avatar, setAvatar] = useState("");

    const generateStars = () => {
        const starsArray = [];
        for (let i = 0; i < review.stars; i++) {
            starsArray.push(<span key={i}>⭐</span>);
        }
        return starsArray;
    };

    useEffect(() => {
        const fetchAvatar = async () => {
            const response = await ImageService.fetchImage(review.creator.avatar);
            setAvatar(response);
        }
        fetchAvatar();
    }, [])

    return (
        <div className="card-body">
            <div className={classes.userReview}>
                <div className="avatar-container">
                    <img src={avatar} alt="" className={classes.avatar}></img>
                </div>
                <div className="user-info">
                    <h3 className={classes.username}>{review.title}</h3>
                    <div className={classes.rating}>
                        {generateStars()}
                    </div>
                </div>
            </div>
            <p className={classes.userReview}>
                {review.description}
            </p>
            {showDivider && <hr />}
        </div>
    );
};

export default Review;