import React, {createContext, useEffect, useState} from 'react';
import {PostService} from "../../api/PostService";
import PostCardItem from "./PostCardItem";
import {useFetching} from "../../hooks/useFetching";
import {getPagesCount} from "../../utils/pages";
import {UserService} from "../../api/UserService";
import posts from "../../pages/posts/Posts";
import {PostResponseService} from "../../api/PostResponseService";
import ResponseCardItem from "./ResponseCardItem";
import MyModal from "../UI/MyModal/MyModal";
import DeleteConfirmForm from "./DeleteConfirmForm";
import PostCreationForm from "../Posts/PostCreationForm";
import PostEditForm from "./PostEditForm";
import {Button, List, message, Modal} from "antd";
import FadeModalDialog from "../UI/MyModal/FadeModalDialog";
import MyMap from "../map/MyMap";


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
                response = await PostResponseService.getAllByUserId(user.id);
                break;
            }
        }
        setList(response);
    });

    const confirmPostDelete = () => {
        PostService.deleteById(postForDelete.id);
        fetchList();
        setDeletePostConfirmVisible(false);
    }

    const confirmResponseDelete = () => {
        PostResponseService.deleteById(postForDelete.id);
        fetchList();
        setDeleteResponseConfirmVisible(false);
    }

    const editPost = (post, handleTitleError, handleDescError, handleFeeError, handleDateError) => {
        PostService.update(post, handleTitleError, handleDescError, handleFeeError, handleDateError, () => {
            fetchList();
            setPostEditVisible(false);
        });
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

    const [isMapOpen, setIsMapOpen] = useState(false);
    const [route, setRoute] = useState({});

    const [messageApi, contextHolder] = message.useMessage();

    const successMessage = (message) => {
        messageApi.open({
            type: 'success',
            content: message
        });
    };

    return (
        <div>
            {contextHolder}
            {deleteResponseConfirmVisible &&
                <Modal  okType='danger' zIndex='10000' title="Вы дейстивтельно хотите удалить данный отклик?" centered open={deleteResponseConfirmVisible} onOk={() => {
                    setDeleteResponseConfirmVisible(false);
                    confirmResponseDelete();
                    successMessage("Отклик успешно удален!")
                }} onCancel={() => setDeleteResponseConfirmVisible(false)}>
                </Modal>
            }
            {deletePostConfirmVisible &&
                <Modal  okType='danger' zIndex='10000' title="Вы дейстивтельно хотите удалить данную публикацию?" centered open={deletePostConfirmVisible} onOk={() => {
                    setDeletePostConfirmVisible(false);
                    confirmPostDelete();
                    successMessage("Публикация успешно удалена!")
                }} onCancel={() => setDeletePostConfirmVisible(false)}>
                </Modal>
            }
            {postEditVisible &&
                <FadeModalDialog additionalComponent={isMapOpen && <MyMap width='100vw' height='100vh' callback={(el) => {
                    setIsMapOpen(false);
                    setRoute(el);
                }}></MyMap>} open={postEditVisible} setOpen={setPostEditVisible}>
                    <PostEditForm setIsMapOpen={setIsMapOpen} isMapOpen={isMapOpen} editPost={editPost} setRoute={setRoute} setPost={setPostForEdit} post={postForEdit}/>
                </FadeModalDialog>
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
                                    onClick={() => {
                                        handleTabClick('posts')
                                        setList([]);
                                    }}
                                >
                                    Публикации
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${listType === 'responses' ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => {
                                        handleTabClick('responses')
                                        setList([]);
                                    }}
                                >
                                    Отклики
                                </button>
                            </div>
                        </div>
                            <div
                                id="scrollableDiv"
                                className="row"
                                style={{
                                    height: 400,
                                    overflow: 'auto',
                                    padding: '0 16px',
                                }}
                            >
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