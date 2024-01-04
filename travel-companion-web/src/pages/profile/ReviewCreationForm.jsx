import React, {useState} from 'react';
import {UserService} from "../../api/UserService";
import {ImageService} from "../../api/ImageService";
import MyInput from "../../components/UI/input/MyInput";
import MyButton from "../../components/UI/button/MyButton";
import {useParams} from "react-router-dom";
import {ReviewService} from "../../api/ReviewService";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {Box} from "@mui/material";

const ReviewCreationForm = ({setModalReviewVisible}) => {


    const labels = {
        0.5: 'Отвратительно',
        1: 'Ужасно',
        1.5: 'Плохо',
        2: 'Так себе',
        2.5: 'Сойдет',
        3: 'Нормально',
        3.5: 'Хорошо',
        4: 'Круто',
        4.5: 'Замечательно',
        5: 'Превосходно',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const [review, setReview] = useState({title:"", description:"", stars:0});
    const [hover, setHover] = React.useState(-1);

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

            {/*<StarRating rating={review.stars} setRating={(e) => setReview({...review, stars: e})} />*/}
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name="hover-feedback"
                    value={review.stars}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setReview({...review, stars: newValue});
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {review.stars !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : review.stars]}</Box>
                )}
            </Box>
            <MyButton type="button" onClick={sendReview}>Сохранить изменения</MyButton>
        </form>
    );
};

export default ReviewCreationForm;