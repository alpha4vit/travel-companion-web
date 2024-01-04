import React, {useState} from 'react';
import {UserService} from "../../api/UserService";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {PostService} from "../../api/PostService";
import classes from "./PostCreationForm.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {TextField} from "@mui/material";
import {Input, Textarea} from "@mui/joy";


const PostCreationForm = ({setVisible, posts, setPosts}) => {

    const [dateThere, setDateThere] = useState(new Date());
    const [dateBack, setDateBack] = useState(new Date());
    const [post, setPost] = useState({title: "", description: "", fee:"", date_there:new Date(), date_back:new Date(), post_type:"DRIVER", transport_id:1});

    const createPost = async () => {
        const created = await PostService.createPost(post);
        setPosts([...posts, created]);
        setVisible(false);
    }

    const updateStartDate = (date, setDate, date_type) => {
        setDate(date);
        if (date_type === "there")
            setPost({...post, date_there: date});
        else if (date_type === "back")
            setPost({...post, date_back: date});
    }

    return (
        <form>
            <div className={classes.formGroup}>
                <TextField
                    fullWidth
                    id="description"
                    onChange={e => setPost({...post, title: e.target.value})}
                    value={post.title}
                    label="Заголовок"
                    variant="outlined"
                />
            </div>
            <div className={classes.formGroup}>
                <TextField
                    fullWidth
                    id="description"
                    onChange={e => setPost({...post, description: e.target.value})}
                    value={post.description}
                    label="Описание"
                    variant="outlined"
                />
            </div>
            <div className={classes.formGroup}>
                <TextField
                    fullWidth
                    id="fee"
                    onChange={e => setPost({...post, fee: e.target.value})}
                    value={post.fee}
                    label="Оплата"
                    variant="outlined"
                />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="dateThere">Дата отправления</label>
                <DatePicker
                    id="dateThere"
                    selected={dateThere}
                    onChange={(date) => updateStartDate(date, setDateThere, "there")}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату"
                />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="dateBack">Дата прибытия</label>
                <DatePicker
                    id="dateBack"
                    selected={dateBack}
                    onChange={(date) => updateStartDate(date, setDateBack, "back")}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Выберите дату"
                />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="postType">Тип поста</label>
                <div className={classes.selectWrapper}>
                    <select
                        id="postType"
                        className={classes.customSelect}
                        onChange={e => setPost({...post, post_type: e.target.value})}
                        value={post.post_type}>
                        <option value="DRIVER">Водитель</option>
                        <option value="COMPANION">Попутчик</option>
                    </select>
                    <div className={classes.selectArrow}></div>
                </div>
            </div>

            <MyButton style={{marginTop: "7px"}} type="button" onClick={createPost}>Сохранить изменения</MyButton>
        </form>
    );
};

export default PostCreationForm;