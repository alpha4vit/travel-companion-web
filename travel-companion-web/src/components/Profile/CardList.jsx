import React, {useEffect, useState} from 'react';
import {PostService} from "../../api/PostService";
import PostCardItem from "./PostCardItem";
import {useFetching} from "../../hooks/useFetching";
import {getPagesCount} from "../../utils/pages";
import {UserService} from "../../api/UserService";
import posts from "../../pages/posts/Posts";
import {PostReponseService} from "../../api/PostReponseService";
import ResponseCardItem from "./ResponseCardItem";
import MyModal from "../UI/MyModal/MyModal";
import DeleteConfirmForm from "./DeleteConfirmForm";
import PostCreationForm from "../Posts/PostCreationForm";
import PostEditForm from "./PostEditForm";

const CardList = ({user}) => {

    const [listType, setListType] = useState("posts");
    const [list, setList] = useState([]);
    const [deletePostConfirmVisible, setDeletePostConfirmVisible] = useState(false);
    const [deleteResponseConfirmVisible, setDeleteResponseConfirmVisible] = useState(false);
    const [postForDelete, setPostForDelete] = useState(null);
    const [responseForDelete, setResponseForDelete] = useState(null);
    const [postEditVisible, setPostEditVisible] = useState(false);
    const [postForEdit, setPostForEdit] = useState(null);

    const [fetchList, isListLoading, listError] = useFetching(async () => {
        var response = [];
        switch (listType){
            case "posts":{
                response = await PostService.getAllByUserId(user.id);
                break;
            }
            case "responses":{
                response = await PostReponseService.getAllByUserId(user.id);
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
            {deleteResponseConfirmVisible &&
                <MyModal visible={deleteResponseConfirmVisible} setVisible={setDeleteResponseConfirmVisible}>
                    <DeleteConfirmForm fetchList={fetchList} setDeleteResponseConfirmVisible={setDeleteResponseConfirmVisible} postForDelete={responseForDelete}/>
                </MyModal>
            }
            {deletePostConfirmVisible &&
                <MyModal visible={deletePostConfirmVisible} setVisible={setDeletePostConfirmVisible}>
                    <DeleteConfirmForm confirmDelete={confirmDelete} setDeletePostConfirmVisible={setDeletePostConfirmVisible} postForDelete={postForDelete}/>
                </MyModal>
            }
            {postEditVisible &&

                <MyModal visible={postEditVisible} setVisible={setPostEditVisible}>
                    <PostEditForm editPost={editPost} setPost={setPostForEdit} post={postForEdit}/>
                </MyModal>
            }
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
                        <div className="row">
                            {listType === 'posts' ?
                                <div className="col-xl-12">
                                    {list.map(item => (
                                        <PostCardItem setPostEditVisible={setPostEditVisible} setPostForEdit={setPostForEdit} setPostForDelete={setPostForDelete} setDeleteConfirmVisible={setDeletePostConfirmVisible} item={item} />
                                    ))}
                                </div>
                                :
                                <div className="col-xl-12">
                                    {list.map(item => (
                                        <ResponseCardItem setResponseForDelete={setResponseForDelete} setDeleteConfirmVisible={setDeleteResponseConfirmVisible} item={item} />
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

export default CardList;