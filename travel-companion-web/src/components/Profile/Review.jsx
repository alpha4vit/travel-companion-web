import React, {useEffect, useState} from 'react';
import classes from "./CardAbout.module.css";
import {UserService} from "../../api/UserService";
import {ImageService} from "../../api/ImageService";
import StarIcon from '@mui/icons-material/Star';
import Rating from "@mui/material/Rating";

const Review = ({review, showDivider}) => {

    const [avatar, setAvatar] = useState("");


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
                        <Rating
                            name="text-feedback"
                            value={review.stars}
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
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