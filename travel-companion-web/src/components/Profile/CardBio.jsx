import React, {useEffect, useState} from 'react';
import MyModal from "../UI/MyModal/MyModal";
import Profile from "../../pages/profile/Profile";
import ProfileEditForm from "./ProfileEditForm";
import {ImageService} from "../../api/ImageService";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import FadeModalDialog from "../UI/MyModal/FadeModalDialog";
import {Avatar} from "@mui/joy";

const CardBio = ({user, setUser}) => {


    const [modal, setModal] = useState(false);
    const [avatar, setAvatar] = useState("");

    const edit = () => {
        setModal(true);
    }

    useEffect( () => {
        const uploadAvatar = async () => {
            const response = await ImageService.fetchImage(user.avatar);
            setAvatar(response);
        }
        uploadAvatar();
    }, [modal])



    return (
        <div className="card">
            <FadeModalDialog title="Изменение профиля" open={modal} setOpen={setModal}>
                <ProfileEditForm setUser={setUser} avatar={avatar} setAvatar={setAvatar} setVisible={setModal} user={user} />
            </FadeModalDialog>
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
                            <div onClick={edit} className="d-flex justify-content-end align-items-end mt-3 pb-3">
                                <Fab size="small"  aria-label="edit">
                                    <EditIcon />
                                </Fab>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CardBio;