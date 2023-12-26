import React, {useState} from 'react';
import classes from "../Posts/PostCreationForm.module.css";
import MyInput from "../UI/input/MyInput";
import DatePicker from "react-datepicker";
import MyButton from "../UI/button/MyButton";
import {PostService} from "../../api/PostService";

const PostEditForm = ({post, setPost, editPost}) => {

    const [dayThere, monthThere, yearThere] = post.date_there.split('/').map(Number);
    const [dayBack, monthBack, yearBack] = post.date_back.split('/').map(Number);
    const parsedDateThere = new Date(yearThere, monthThere - 1, dayThere);
    const parsedDateBack = new Date(yearBack, monthBack - 1, dayBack);
    const [dateThere, setDateThere] = useState(parsedDateThere);
    const [dateBack, setDateBack] = useState(parsedDateBack);

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

            <MyButton style={{marginTop: "7px"}} type="button" onClick={editPost}>Сохранить изменения</MyButton>
        </form>
    );
};

export default PostEditForm;