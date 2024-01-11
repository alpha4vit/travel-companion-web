import React from 'react';
import {DateConverter} from "../../utils/DateConverter";

const ResponseCardItem = ({item, setDeleteConfirmVisible, setResponseForDelete}) => {
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
                                        htmlFor="customCheck1">{item.post != null && item.post.title}</label>
                                </div>
                                <p className="mb-0 text-muted font-size-12">{item.comment}</p>
                            </div>
                            <div className="col-xl-6 col-sm-7">
                                <div className="row align-items-center">
                                    <div className="col-xl-7 col-md-6 col-sm-7">
                                        <div className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                            <div className="action-button" onClick={() => {
                                                setDeleteConfirmVisible(true);
                                                setResponseForDelete(item);
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

export default ResponseCardItem;