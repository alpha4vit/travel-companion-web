import React from 'react';
import "./CardItem.css";
import {DateConverter} from "../../utils/DateConverter";

const PostCardItem = ({item, setDeleteConfirmVisible, setPostForDelete, setPostForEdit, setPostEditVisible}) => {
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
                                            <p className="mb-0 text-muted font-size-12"><i>Дата отправления:</i> {DateConverter.convertDateSimple(item.date_there)}</p>
                                            <p className="mb-0 text-muted font-size-12"><i>Дата прибытия:</i> {DateConverter.convertDateSimple(item.date_back)}</p>
                                            <p className="mb-0 text-muted font-size-12"><i>Город отправления:</i> {item.route.departure.text}</p>
                                            <p className="mb-0 text-muted font-size-12"><i>Город прибытия:</i> {item.route.destination.text}</p>
                                            <p className="mb-0 text-muted font-size-12"><i>Оплата:</i> {item.fee}</p>
                                        </div>
                                        <div className="col-xl-7 col-md-6 col-sm-7">
                                            <div className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                <div className="action-button" onClick={() => {
                                                    setPostEditVisible(true);
                                                    setPostForEdit(item);
                                                }
                                                }>
                                                    <a
                                                       className="mb-0 text-muted fw-medium edit-item"
                                                       data-bs-toggle="modal"
                                                       data-bs-target=".bs-example-new-task"><i
                                                        className="mdi mdi-square-edit-outline  align-middle"
                                                    ></i></a>
                                                </div>
                                                <div className="action-button" onClick={() => {
                                                    setDeleteConfirmVisible(true);
                                                    setPostForDelete(item);
                                                }}>
                                                    <a className="delete-item"
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