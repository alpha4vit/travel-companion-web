import {useEffect, useState} from "react";
import {ImageService} from "../../api/ImageService";
import {useParams} from "react-router-dom";
import {UserService} from "../../api/UserService";


const UserCardBio = () => {

    const [avatar, setAvatar] = useState("");
    const {userId} = useParams();
    const [user, setUser] = useState({username:"", email:"", phone_number:"", bio:""});

    useEffect(() => {
        const fetch = async () => {
           await UserService.getById(userId, (response)=>setUser(response));
        }
        fetch();
    }, [])

    useEffect(() => {
        const fetchAvatar = async () => {
            await UserService.getById(userId, (temp) => {
                ImageService.fetchImage(temp.avatar, (response) => setAvatar(response));
            });
        }
        fetchAvatar();
    }, [])

    return (
        <div className="card">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserCardBio;