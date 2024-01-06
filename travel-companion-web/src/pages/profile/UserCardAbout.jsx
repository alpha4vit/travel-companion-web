import {ReviewService} from "../../api/ReviewService";
import {useFetching} from "../../hooks/useFetching";
import {UserService} from "../../api/UserService";
import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import Review from "../../components/Profile/Review";
import MyButton from "../../components/UI/button/MyButton";
import MyModal from "../../components/UI/MyModal/MyModal";
import Button from "@mui/material/Button";

const UserCardAbout = ({isModalReviewVisible, setModalReviewVisible}) => {

    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({title: "", description: "", stars: 0})

    const {userId} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const response = await UserService.getById(userId);
            setUser(response);
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
                    <div className="review-list">
                        {reviews.length !== 0 &&
                            reviews.map((review, index) => (
                                <Review showDivider={index !== reviews.length - 1} review={review}/>
                            ))}
                        {reviews.length === 0 &&
                            <p>Отзывы отсутствуют</p>
                        }
                    </div>
                </div>
            </div>
    );
};

export default UserCardAbout;