import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {UserService} from "../../api/UserService";
import {PostService} from "../../api/PostService";
import {ImageService} from "../../api/ImageService";


const ProfileEditForm = ({user, setVisible, avatar, setAvatar}) => {

    const [edited, setEdited] = useState({...user});
    const [isImageDownloaded, setImageDownloaded] = useState(false);

    const editPost = async () => {
        await UserService.updateUser(edited);
        if (isImageDownloaded){
            const response  = await ImageService.loadImage(avatar);
            setEdited({...edited, avatar: response})
            localStorage.setItem("authenticatedUser", JSON.stringify({...edited, avatar: response}));
        }
        else {
            localStorage.setItem("authenticatedUser", JSON.stringify(edited));
        }
        setVisible(false);
        setImageDownloaded(false);
    }

    return (
        <div>
            <form>
                <MyInput onChange={(e) => {
                    setAvatar(e.target.files[0]);
                    setImageDownloaded(true);
                }} id="avatar" type="file" placeholder="Аватарка"/>
            </form>
            <form>
                <MyInput onChange={e => setEdited({...edited, username: e.target.value})} value={edited.username} type="text" placeholder="Имя пользователя"/>
                <MyInput onChange={e => setEdited({...edited, email: e.target.value})} value={edited.email} type="text" placeholder="Электронная почта"/>
                <MyInput onChange={e => setEdited({...edited, phone_number: e.target.value})} value={edited.phone_number} type="text" placeholder="Номер телефона"/>
                <MyInput onChange={e => setEdited({...edited, bio: e.target.value})} value={edited.bio} type="text" placeholder="Биография"/>
                <MyButton type="button" onClick={editPost}>Сохранить изменения</MyButton>
            </form>
        </div>
    );
};

export default ProfileEditForm;