import React from 'react';
import {DateConverter} from "../../utils/DateConverter";


const PostCardItem = ({item}) => {

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