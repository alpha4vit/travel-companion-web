import React, {useEffect, useState} from 'react';
import MyModal from "../UI/MyModal/MyModal";
import Profile from "../../pages/profile/Profile";
import ProfileEditForm from "./ProfileEditForm";
import {ImageService} from "../../api/ImageService";




const CardBio = () => {


    const [modal, setModal] = useState(false);
    const [avatar, setAvatar] = useState("");


    var user = JSON.parse(localStorage.getItem("authenticatedUser"));
    const edit = () => {
        setModal(true);
    }

    useEffect( () => {
        user = JSON.parse(localStorage.getItem("authenticatedUser"));
        const uploadAvatar = async () => {
            const response = await ImageService.fetchImage(user.avatar);
            setAvatar(response);
        }
        uploadAvatar();
    }, [modal])

    return (
        <div className="card">
            <MyModal visible={modal} setVisible={setModal}>
                <ProfileEditForm avatar={avatar} setAvatar={setAvatar} setVisible={setModal} user={user}/>
            </MyModal>
            <div className="card-body pb-0">
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="text-center border-end">
                            <img src={avatar}
                                 className="img-fluid avatar-xxl rounded-circle" alt="" />
                            <h4 className="text-primary font-size-20 mt-3 mb-2">{user.username}</h4>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="ms-3 d-flex flex-column h-100">
                            <div>
                                <h4 className="card-title mb-2">Биография</h4>
                                <p className="mb-0 text-muted">{user.bio}</p>
                            </div>
                            <div className="row my-4">
                                <div className="col-md-12">
                                    <div>
                                        <p className="text-muted mb-2 fw-medium">
                                            <i className="mdi mdi-email-outline me-2"></i>{user.email}
                                        </p>
                                        <p className="text-muted fw-medium mb-0">
                                            <i className="mdi mdi-phone-in-talk-outline me-2"></i>{user.phone_number}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div onClick={edit} className="d-flex justify-content-end align-items-end mt-3">
                                <a
                                   className="btn btn-lg btn-secondary mb-0 text-white mt-2 mb-3"
                                   data-bs-toggle="modal"
                                   data-bs-target=".bs-example-new-task">
                                    <i className="mdi mdi-square-edit-outline font-size-16 align-middle"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CardBio;