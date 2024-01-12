import React, {useEffect, useState} from "react";
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
import {Card, Empty, Skeleton} from "antd";
import classes from "../posts/Posts.module.css";


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
            await UserService.getById(userId, (resp) => {
                setUser(resp);
            });

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
                            {isListLoading && (
                                <div className={classes.list}>
                                    {[...Array(3)].map((_, index) => (
                                        <Card
                                            style={{
                                                marginBottom:'16px',
                                                width: '100%',
                                            }}
                                        >
                                            <Skeleton loading={isListLoading} active>
                                            </Skeleton>
                                        </Card>
                                    ))}
                                </div>
                            )}
                            {listType === 'posts' && !isListLoading ?
                                <div className="col-xl-12">
                                    {list.length > 0 ?
                                        list.map(item => (
                                            <UserPostCardItem item={item} />
                                        ))
                                        :
                                        <Empty description="Публикации не найдены!" style={{marginTop:'40px'}}/>
                                    }
                                </div>
                                :
                                <div className="col-xl-12">
                                    {list.length > 0 ?
                                        list.map(item => (
                                            <ResponseCardItem item={item} />
                                        ))
                                        :
                                        <Empty description="Отклики не найдены!" style={{marginTop:'40px'}}/>
                                    }
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