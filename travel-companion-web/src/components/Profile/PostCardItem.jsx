import React from 'react';
import "./CardItem.css";
const PostCardItem = ({item, listType}) => {

    return (
            <div className="task-list-box" id="landing-task">
                <div id="task-item-1">
                    <div className="card task-box rounded-3">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-xl-6 col-sm-5">
                                    <div className="checklist form-check font-size-15">
                                        <label
                                            className="form-check-label ms-1 task-title"
                                            htmlFor="customCheck1">{item.title}</label>
                                    </div>
                                    <p className="mb-0 text-muted font-size-12">{item.description}</p>
                                </div>
                                <div className="col-xl-6 col-sm-7">
                                    <div className="row align-items-center">
                                        <div className="col-info col-xl-5 col-md-6 col-sm-5">
                                            <p className="mb-0 text-muted font-size-12">Дата отправления: {item.date_there}</p>
                                            <p className="mb-0 text-muted font-size-12">Дата возвращения: {item.date_back}</p>
                                            <p className="mb-0 text-muted font-size-12">Оплата: {item.fee}</p>
                                        </div>
                                        <div className="col-xl-7 col-md-6 col-sm-7">
                                            <div className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                <div>
                                                    <a href="profile#"
                                                       className="mb-0 text-muted fw-medium edit-item"
                                                       data-bs-toggle="modal"
                                                       data-bs-target=".bs-example-new-task"><i
                                                        className="mdi mdi-square-edit-outline  align-middle"
                                                    ></i></a>
                                                </div>
                                                <div>
                                                    <a href="profile#" className="delete-item"
                                                    >
                                                        <i className="mdi mdi-trash-can-outline align-middle  text-danger"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default PostCardItem;