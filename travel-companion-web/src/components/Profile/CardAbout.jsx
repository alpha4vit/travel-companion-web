import React, {useEffect, useState} from 'react';
import classes from "./CardAbout.module.css"
import {useFetching} from "../../hooks/useFetching";
import {PostService} from "../../api/PostService";
import {PostReponseService} from "../../api/PostReponseService";
import {ReviewService} from "../../api/ReviewService";
import Review from "./Review";
const CardAbout = ({user}) => {

    const [reviews, setReviews] = useState([]);

    const [fetchReviews, isReviewsLoading, reviewsError] = useFetching(async () => {
        const response = await ReviewService.getAllByUserId(user.id);
        setReviews(response);
    });

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
            <div className="col-xl-4">
                <div className="card">
                    {reviews.length !== 0 &&
                        reviews.map((review, index) => (
                        <Review showDivider={index !== reviews.length - 1} review={review}/>
                    ))}
                    {reviews.length === 0 &&
                        <p>Отзывы отсутствуют</p>
                    }
                </div>

            </div>
    );
};

export default CardAbout;