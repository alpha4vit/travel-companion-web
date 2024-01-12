import React, {useEffect, useState} from 'react';
import classes from "./CardAbout.module.css"
import {useFetching} from "../../hooks/useFetching";
import {PostService} from "../../api/PostService";
import {PostResponseService} from "../../api/PostResponseService";
import {ReviewService} from "../../api/ReviewService";
import Review from "./Review";
import {Card, Empty, Skeleton, Typography} from "antd";
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
                <div className="card reviews-container">
                    <h4 style={{marginTop:'20px', marginLeft:'20px'}} className="card-title mb-0">
                        Список отзывов
                    </h4>
                    <div className="review-list">
                        {isReviewsLoading && (
                            <div style={{marginLeft:'30px', marginTop:'30px'}}>
                                {[...Array(5)].map((_, index) => (
                                    <Card
                                        style={{
                                            marginBottom:'16px',
                                            width: '100%',
                                        }}
                                    >
                                        <Skeleton loading={isReviewsLoading} avatar active>
                                        </Skeleton>
                                    </Card>
                                ))}
                            </div>
                        )}
                        {reviews.length !== 0 &&
                            reviews.map((review, index) => (
                                <Review showDivider={index !== reviews.length - 1} review={review}/>
                            ))}
                        {reviews.length === 0 &&
                            <Empty description="Отзывы не найдены!" style={{marginTop:'130px'}}/>
                        }
                    </div>
                </div>
            </div>
    );
};

export default CardAbout;