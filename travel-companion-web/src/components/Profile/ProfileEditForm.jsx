import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {UserService} from "../../api/UserService";


const ProfileEditForm = ({user, setVisible, setAvatar}) => {

    const [edited, setEdited] = useState({...user});

    const editPost = () => {
        UserService.updateUser(edited);
        setVisible(false);
        localStorage.setItem("authenticatedUser", JSON.stringify(edited));
    }

    return (
        <form>
            <MyInput type="file" placeholder="Аватарка"/>
            <MyInput onChange={e => setEdited({...edited, username: e.target.value})} value={edited.username} type="text" placeholder="Имя пользователя"/>
            <MyInput onChange={e => setEdited({...edited, email: e.target.value})} value={edited.email} type="text" placeholder="Электронная почта"/>
            <MyInput onChange={e => setEdited({...edited, phone_number: e.target.value})} value={edited.phone_number} type="text" placeholder="Номер телефона"/>
            <MyInput onChange={e => setEdited({...edited, bio: e.target.value})} value={edited.bio} type="text" placeholder="Биография"/>
            <MyButton type="button" onClick={editPost}>Сохранить изменения</MyButton>
        </form>
    );
};

export default ProfileEditForm;