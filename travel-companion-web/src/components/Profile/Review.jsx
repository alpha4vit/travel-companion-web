import React from 'react';
import classes from "./CardAbout.module.css";

const Review = ({review, showDivider}) => {

    const generateStars = () => {
        const starsArray = [];
        for (let i = 0; i < review.stars; i++) {
            starsArray.push(<span key={i}>⭐</span>);
        }
        return starsArray;
    };

    return (
        <div className="card-body">
            <div className={classes.userReview}>
                <div className="avatar-container">
                    <img src="" alt="" className={classes.avatar}></img>
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