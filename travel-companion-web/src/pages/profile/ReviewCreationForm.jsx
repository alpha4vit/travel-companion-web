import React, {useState} from 'react';
import {UserService} from "../../api/UserService";
import {ImageService} from "../../api/ImageService";
import MyInput from "../../components/UI/input/MyInput";
import MyButton from "../../components/UI/button/MyButton";
import StarRating from "../../components/UI/Star/StarRating";
import {useParams} from "react-router-dom";
import {ReviewService} from "../../api/ReviewService";

const ReviewCreationForm = ({setModalReviewVisible}) => {

    const [review, setReview] = useState({title:"", description:"", stars:0});
    const {userId} = useParams();
    const sendReview = async () => {
        await ReviewService.sendReview(userId, review);
        setModalReviewVisible(false);
    }

    return (
        <form>
            <MyInput onChange={e => setReview({...review, title: e.target.value})} value={review.title}
                     type="text" placeholder="Заголовок"/>
            <MyInput onChange={e => setReview({...review, description: e.target.value})} value={review.email} type="text"
                     placeholder="Электронная почта"/>

            <StarRating rating={review.stars} setRating={(e) => setReview({...review, stars: e})} />
            <MyButton type="button" onClick={sendReview}>Сохранить изменения</MyButton>
        </form>
    );
};

export default ReviewCreationForm;