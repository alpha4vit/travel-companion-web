import React, {useState} from 'react';
import classes from "./PostCreationForm.module.css";
import MyInput from "../UI/input/MyInput";
import DatePicker from "react-datepicker";
import MyButton from "../UI/button/MyButton";
import {PostReponseService} from "../../api/PostReponseService";
import StarRating from "../UI/Star/StarRating";

const ResponseForm = ({responsedPostId, setResponseVisible}) => {

    const user = JSON.parse(localStorage.getItem("authenticatedUser"));
    const [response, setResponse] = useState({title:"", comment:"", stars:0});

    const respond = async () => {
        console.log(responsedPostId)
        await PostReponseService.respond(response, user.id, responsedPostId);
        setResponseVisible(false);
    }

    return (
        <div>
            <form>
                <div className={classes.formGroup}>
                    <label htmlFor="title">Заголовок</label>
                    <MyInput
                        id="title"
                        type="text"
                        placeholder="Заголовок"
                        onChange={(e) => setResponse({...response, title: e.target.value})}
                    />
                </div>

                <div className={classes.formGroup}>
                    <label htmlFor="description">Комментарий</label>
                    <MyInput
                        id="description"
                        type="text"
                        placeholder="Комментарий"
                        onChange={(e) => setResponse({...response, comment: e.target.value})}
                    />
                </div>
                <MyButton onClick={() => respond()} style={{marginTop: "7px"}} type="button" >Откликнуться</MyButton>
            </form>
        </div>
    );
};

export default ResponseForm;