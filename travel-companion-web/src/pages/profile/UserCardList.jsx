import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {UserService} from "../../api/UserService";
import {useFetching} from "../../hooks/useFetching";
import {PostService} from "../../api/PostService";
import {PostResponseService} from "../../api/PostResponseService";
import MyModal from "../../components/UI/MyModal/MyModal";
import DeleteConfirmForm from "../../components/Profile/DeleteConfirmForm";
import PostEditForm from "../../components/Profile/PostEditForm";
import PostCardItem from "../../components/Profile/PostCardItem";
import ResponseCardItem from "../../components/Profile/ResponseCardItem";
import UserPostCardItem from "./UserPostCardItem";


const UserCardList = () => {

    const [listType, setListType] = useState("posts");
    const [list, setList] = useState([]);
    const [deletePostConfirmVisible, setDeletePostConfirmVisible] = useState(false);
    const [postForDelete, setPostForDelete] = useState(null);
    const [postEditVisible, setPostEditVisible] = useState(false);
    const [postForEdit, setPostForEdit] = useState(null);

    const {userId} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetch = async () => {
            const response = await UserService.getById(userId);
            setUser(response);
        }
        fetch();
    }, [])

    const [fetchList, isListLoading, listError] = useFetching(async () => {
        var response = [];
        switch (listType){
            case "posts":{
                response = await PostService.getAllByUserId(userId);
                break;
            }
            case "responses":{
                response = await PostResponseService.getAllByUserId(userId);
                break;
            }
        }
        setList(response);
    });

    const confirmDelete = () => {
        PostService.deleteById(postForDelete.id);
        fetchList();
        setDeletePostConfirmVisible(false);
    }

    const editPost = () => {
        PostService.update(postForEdit);
        fetchList();
        setPostEditVisible(false);
    }

    useEffect(() => {
        fetchList();
    }, [setPostEditVisible, postEditVisible,  setDeletePostConfirmVisible, deletePostConfirmVisible, listType])

    var listName = "";
    switch (listType){
        case "posts": {
            listName = "Публикации"
            break;
        }
        case "responses":{
            listName = "Отклики";
            break;
        }
        default: listName = "Публикации";
    }

    const handleTabClick = (type) => {
        setListType(type);
    };

    return (
        <div>
            <div className="card">
                <div className="tab-content p-4">
                    <div className="tab-pane active show" id="tasks-tab" role="tabpanel">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="card-title mb-0">
                                {listType === 'posts' ? 'Список Публикаций' : 'Список Откликов'}
                            </h4>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className={`btn ${listType === 'posts' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => handleTabClick('posts')}
                                >
                                    Публикации
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${listType === 'responses' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => handleTabClick('responses')}
                                >
                                    Отклики
                                </button>
                            </div>
                        </div>
                        <div
                            id="scrollableDiv"
                            className="row"
                            style={{
                                height: 300,
                                overflow: 'auto',
                                padding: '0 16px',
                            }}
                        >
                            {listType === 'posts' ?
                                <div className="col-xl-12">
                                    {list.map(item => (
                                        <UserPostCardItem item={item} />
                                    ))}
                                </div>
                                :
                                <div className="col-xl-12">
                                    {list.map(item => (
                                        <ResponseCardItem item={item} />
                                    ))}
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCardList;