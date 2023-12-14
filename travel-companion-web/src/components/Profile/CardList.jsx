import React from 'react';

const CardList = () => {
    return (
        <div>
            <div className="card">
                <div className="tab-content p-4">
                    <div className="tab-pane active show" id="tasks-tab" role="tabpanel">
                        <h4 className="card-title mb-4">Tasks</h4>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="task-list-box" id="landing-task">
                                    <div id="task-item-1">
                                        <div className="card task-box rounded-3">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-xl-6 col-sm-5">
                                                        <div className="checklist form-check font-size-15">
                                                            <input type="checkbox"
                                                                   className="form-check-input"
                                                                   id="customCheck1"/>
                                                            <label
                                                                className="form-check-label ms-1 task-title"
                                                                htmlFor="customCheck1">Create a New
                                                                Landing</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-xl-5 col-md-6 col-sm-5">
                                                                <div
                                                                    className="avatar-group mt-3 mt-xl-0 task-assigne">
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           value="member-2"
                                                                           data-bs-placement="top"
                                                                           aria-label="Mark Powell"
                                                                           data-bs-original-title="Mark Powell">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           value="member-4"
                                                                           data-bs-placement="top"
                                                                           aria-label="Craig Hall"
                                                                           data-bs-original-title="Craig Hall">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-block"
                                                                           data-bs-toggle="tooltip"
                                                                           value="member-11"
                                                                           data-bs-placement="top"
                                                                           data-bs-original-title="Sarah Kerns">
                                                                            <div className="avatar-sm">
                                                                                <div
                                                                                    className="avatar-title rounded-circle bg-info">
                                                                                    S
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7 col-md-6 col-sm-7">
                                                                <div
                                                                    className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                                    <div>
                                                                                <span
                                                                                    className="badge rounded-pill badge-soft-warning font-size-11 task-status">Progress</span>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"><i
                                                                            className="mdi mdi-checkbox-marked-circle-outline me-1"></i>4/8
                                                                        </a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"
                                                                           data-bs-toggle="modal"
                                                                           data-bs-target=".bs-example-new-task"><i
                                                                            className="mdi mdi-square-edit-outline font-size-16 align-middle"
                                                                           ></i></a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#" className="delete-item"
                                                                           >
                                                                            <i className="mdi mdi-trash-can-outline align-middle font-size-16 text-danger"></i>
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

                                <div className="task-list-box" id="design-task">
                                    <div id="task-item-2">
                                        <div className="card task-box rounded-3">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-xl-6 col-sm-5">
                                                        <div className="checklist form-check font-size-15">
                                                            <input type="checkbox"
                                                                   className="form-check-input"
                                                                   id="customCheck2"/>
                                                            <label
                                                                className="form-check-label ms-1 task-title"
                                                                htmlFor="customCheck2">Create a Layout
                                                                Design</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-xl-5 col-md-6 col-sm-5">
                                                                <div
                                                                    className="avatar-group mt-3 mt-xl-0 task-assigne">
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           value="member-3"
                                                                           data-bs-toggle="tooltip"
                                                                           data-bs-placement="top"
                                                                           aria-label="Terrell Soto"
                                                                           data-bs-original-title="Terrell Soto">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           value="member-2"
                                                                           data-bs-toggle="tooltip"
                                                                           data-bs-placement="top"
                                                                           aria-label="Ruhi Shah"
                                                                           data-bs-original-title="Ruhi Shah">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           value="member-1"
                                                                           data-bs-toggle="tooltip"
                                                                           data-bs-placement="top"
                                                                           aria-label="Ruhi Shah"
                                                                           data-bs-original-title="Ruhi Shah">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7 col-md-6 col-sm-7">
                                                                <div
                                                                    className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                                    <div>
                                                                                <span
                                                                                    className="badge rounded-pill badge-soft-warning font-size-11 task-status">Progress</span>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"><i
                                                                            className="mdi mdi-checkbox-marked-circle-outline me-1"></i>8/12
                                                                        </a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"
                                                                           data-bs-toggle="modal"
                                                                           data-bs-target=".bs-example-new-task"><i
                                                                            className="mdi mdi-square-edit-outline font-size-16 align-middle"
                                                                            ></i></a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#" className="delete-item"
                                                                           >
                                                                            <i className="mdi mdi-trash-can-outline font-size-16 text-danger align-middle"></i>
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

                                <div className="task-list-box" id="blog-task">
                                    <div id="task-item-3">
                                        <div className="card task-box rounded-3">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-xl-6 col-sm-5">
                                                        <div className="checklist form-check font-size-15">
                                                            <input type="checkbox"
                                                                   className="form-check-input"
                                                                   id="customCheck3"/>

                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-xl-5 col-md-6 col-sm-5">
                                                                <div
                                                                    className="avatar-group mt-3 mt-xl-0 task-assigne">
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           data-bs-placement="top"
                                                                           value="member-6"
                                                                           aria-label="Scott Edward"
                                                                           data-bs-original-title="Scott Edward">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-block"
                                                                           data-bs-toggle="tooltip"
                                                                           value="member-12"
                                                                           data-bs-placement="top"
                                                                           data-bs-original-title="Denny Silva">
                                                                            <div className="avatar-sm">
                                                                                <div
                                                                                    className="avatar-title rounded-circle bg-primary">
                                                                                    D
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           data-bs-placement="top"
                                                                           value="member-10"
                                                                           aria-label="Betty Cooney"
                                                                           data-bs-original-title="Betty Cooney">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           data-bs-placement="top"
                                                                           value="member-5"
                                                                           aria-label="Michael Jackson"
                                                                           data-bs-original-title="Michael Jackson">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7 col-md-6 col-sm-7">
                                                                <div
                                                                    className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                                    <div>
                                                                                <span
                                                                                    className="badge rounded-pill badge-soft-danger font-size-11 task-status">Pending</span>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"><i
                                                                            className="mdi mdi-checkbox-marked-circle-outline me-1"></i>0/6
                                                                        </a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"
                                                                           data-bs-toggle="modal"
                                                                           data-bs-target=".bs-example-new-task"><i
                                                                            className="mdi mdi-square-edit-outline font-size-16 align-middle"
                                                                           ></i></a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#" className="delete-item"
                                                                          >
                                                                            <i className="mdi mdi-trash-can-outline font-size-16 align-middle text-danger"></i>
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

                                <div className="task-list-box" id="comp-task">
                                    <div id="task-item-4">
                                        <div className="card task-box rounded-3">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-xl-6 col-sm-5">
                                                        <div className="checklist form-check font-size-15">
                                                            <input type="checkbox"
                                                                   className="form-check-input"
                                                                   id="customChat" checked=""/>
                                                            <label
                                                                className="form-check-label ms-1 task-title"
                                                                htmlFor="customChat">Chat App Pages</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-xl-5 col-md-6 col-sm-5">
                                                                <div
                                                                    className="avatar-group mt-3 mt-xl-0 task-assigne">
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           data-bs-placement="top"
                                                                           value="member-3"
                                                                           aria-label="Annmarie Paul"
                                                                           data-bs-original-title="Annmarie Paul">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7 col-md-6 col-sm-7">
                                                                <div
                                                                    className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                                    <div>
                                                                                <span
                                                                                    className="badge rounded-pill badge-soft-success font-size-11 task-status">Completed</span>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"><i
                                                                            className="mdi mdi-checkbox-marked-circle-outline me-1"></i>3/3
                                                                        </a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"
                                                                           data-bs-toggle="modal"
                                                                           data-bs-target=".bs-example-new-task"><i
                                                                            className="mdi mdi-square-edit-outline font-size-16 align-middle"
                                                                           ></i></a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#" className="delete-item"
                                                                          >
                                                                            <i className="mdi mdi-trash-can-outline font-size-16 align-middle text-danger"></i>
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

                                <div className="task-list-box" id="app-task">
                                    <div id="task-item-5">
                                        <div className="card task-box rounded-3">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-xl-6 col-sm-5">
                                                        <div className="checklist form-check font-size-15">
                                                            <input type="checkbox"
                                                                   className="form-check-input"
                                                                   id="customComponents"/>
                                                            <label
                                                                className="form-check-label ms-1 task-title"
                                                                htmlFor="customComponents">Components
                                                                Pages</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-xl-5 col-md-6 col-sm-5">
                                                                <div
                                                                    className="avatar-group mt-3 mt-xl-0 task-assigne">
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           value="member-7"
                                                                           data-bs-placement="top"
                                                                           aria-label="Eric Williams"
                                                                           data-bs-original-title="Eric Williams">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           value="member-9"
                                                                           data-bs-placement="top"
                                                                           aria-label="Richard Millar"
                                                                           data-bs-original-title="Richard Millar">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar8.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           value="member-8"
                                                                           data-bs-placement="top"
                                                                           aria-label="Tama Turner"
                                                                           data-bs-original-title="Tama Turner">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar8.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7 col-md-6 col-sm-7">
                                                                <div
                                                                    className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                                    <div>
                                                                                <span
                                                                                    className="badge rounded-pill badge-soft-danger font-size-11 task-status">Pending</span>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"><i
                                                                            className="mdi mdi-checkbox-marked-circle-outline me-1"></i>7/17
                                                                        </a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"
                                                                           data-bs-toggle="modal"
                                                                           data-bs-target=".bs-example-new-task"><i
                                                                            className="mdi mdi-square-edit-outline font-size-16 align-middle"
                                                                           ></i></a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#" className="delete-item"
                                                                          >
                                                                            <i className="mdi mdi-trash-can-outline font-size-16 align-middle text-danger"></i>
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

                                <div className="task-list-box" id="gallery-task">
                                    <div id="task-item-6">
                                        <div className="card task-box rounded-3">
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-xl-6 col-sm-5">
                                                        <div className="checklist form-check font-size-15">
                                                            <input type="checkbox"
                                                                   className="form-check-input"
                                                                   id="customGallry" checked=""/>
                                                            <label
                                                                className="form-check-label ms-1 task-title"
                                                                htmlFor="customGallry">Create a Gallery
                                                                Pages</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-7">
                                                        <div className="row align-items-center">
                                                            <div className="col-xl-5 col-md-6 col-sm-5">
                                                                <div
                                                                    className="avatar-group mt-3 mt-xl-0 task-assigne">
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           value="member-5"
                                                                           data-bs-placement="top"
                                                                           aria-label="John Walker"
                                                                           data-bs-original-title="John Walker">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                    <div className="avatar-group-item">
                                                                        <a href="javascript: void(0);"
                                                                           className="d-inline-block"
                                                                           data-bs-toggle="tooltip"
                                                                           data-bs-placement="top"
                                                                           value="member-4"
                                                                           aria-label="Willie Garcia"
                                                                           data-bs-original-title="Willie Garcia">
                                                                            <img
                                                                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                                                                alt=""
                                                                                className="rounded-circle avatar-sm"></img>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-7 col-md-6 col-sm-7">
                                                                <div
                                                                    className="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">
                                                                    <div>
                                                                                <span
                                                                                    className="badge rounded-pill badge-soft-success font-size-11 task-status">Completed</span>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"><i
                                                                            className="mdi mdi-checkbox-marked-circle-outline me-1"></i>5/5
                                                                        </a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#"
                                                                           className="mb-0 text-muted fw-medium"
                                                                           data-bs-toggle="modal"
                                                                           data-bs-target=".bs-example-new-task"><i
                                                                            className="mdi mdi-square-edit-outline font-size-16 align-middle"
                                                                           ></i></a>
                                                                    </div>
                                                                    <div>
                                                                        <a href="profile#" className="delete-item"
                                                                          >
                                                                            <i className="mdi mdi-trash-can-outline font-size-16 align-middle text-danger"></i>
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

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default CardList;