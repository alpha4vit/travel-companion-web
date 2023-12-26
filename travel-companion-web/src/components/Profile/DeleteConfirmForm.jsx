import React from 'react';
import Post from "../Posts/Post";
import {PostService} from "../../api/PostService";

const DeleteConfirmForm = ({postForDelete, setDeletePostConfirmVisible, confirmDelete}) => {



    return (
        <form>
            <label>Вы дейстивтельно хотите удалить: {postForDelete.title} ?</label>
            <button onClick={confirmDelete} type="button">Подтвердить</button>
            <button type="button">Отклонить</button>
        </form>
    );
};

export default DeleteConfirmForm;