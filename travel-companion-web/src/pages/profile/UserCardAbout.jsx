import {ReviewService} from "../../api/ReviewService";
import {useFetching} from "../../hooks/useFetching";
import {UserService} from "../../api/UserService";
import React, {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import Review from "../../components/Profile/Review";
import MyButton from "../../components/UI/button/MyButton";
import MyModal from "../../components/UI/MyModal/MyModal";
import Button from "@mui/material/Button";
import {Card, Empty, Skeleton} from "antd";
import classes from "../posts/Posts.module.css";

const UserCardAbout = ({isModalReviewVisible, setModalReviewVisible}) => {

    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({title: "", description: "", stars: 0})

    const {userId} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetch = async () => {
            await UserService.getById(userId, (response) => setUser(response));
        }
        fetch();
    }, [])


    const [fetchReviews, isReviewsLoading, reviewsError] = useFetching(async () => {
        const response = await ReviewService.getAllByUserId(userId);
        setReviews(response);
    });

    useEffect(() => {
        fetchReviews();
    }, [isModalReviewVisible, setModalReviewVisible]);


    return (
            <div className="col-xl-4">
                <div style={{marginBottom: 10}}>
                    <Button variant="contained" onClick={() => {
                        setModalReviewVisible(true)
                    }}>Оставить отзыв!</Button>
                </div>
                <div className="card reviews-container">
                    <h4 style={{marginTop:'20px', marginLeft:'20px'}} className="card-title mb-0">
                        Список отзывов
                    </h4>
                    <div className="review-list">
                        {isReviewsLoading && (
                            <div className={classes.list}>
                                {[...Array(3)].map((_, index) => (
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

export default UserCardAbout;