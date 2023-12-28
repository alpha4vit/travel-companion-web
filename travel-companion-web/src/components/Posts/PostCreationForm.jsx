import React, {useState} from 'react';
import {UserService} from "../../api/UserService";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {PostService} from "../../api/PostService";
import classes from "./PostCreationForm.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        if (date_type === "there")
            setPost({...post, date_there: formattedDate});
        else if (date_type === "back")
            setPost({...post, date_back: formattedDate});
    }

    return (
        <form>
            <div className={classes.formGroup}>
                <label htmlFor="title">Заголовок</label>
                <MyInput
                    id="title"
                    onChange={e => setPost({...post, title: e.target.value})}
                    value={post.title}
                    type="text"
                    placeholder="Заголовок"
                />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="description">Описание</label>
                <MyInput
                    id="description"
                    onChange={e => setPost({...post, description: e.target.value})}
                    value={post.description}
                    type="text"
                    placeholder="Описание"
                />
            </div>

            <div className={classes.formGroup}>
                <label htmlFor="fee">Оплата</label>
                <MyInput
                    id="fee"
                    onChange={e => setPost({...post, fee: e.target.value})}
                    value={post.fee}
                    type="text"
                    placeholder="Оплата"
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