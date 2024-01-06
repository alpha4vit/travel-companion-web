import CardBio from "../Profile/CardBio";
import CardList from "../Profile/CardList";
import CardAbout from "../Profile/CardAbout";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {UserService} from "../../api/UserService";
import UserCardBio from "../../pages/profile/UserCardBio";
import UserCardList from "../../pages/profile/UserCardList";
import UserCardAbout from "../../pages/profile/UserCardAbout";
import MyModal from "../UI/MyModal/MyModal";
import ReviewCreationForm from "../../pages/profile/ReviewCreationForm";
import FadeModalDialog from "../UI/MyModal/FadeModalDialog";


const UserProfile = () => {

    const [isModalReviewVisible, setModalReviewVisible] = useState(false);

    return (
        <div>
            <FadeModalDialog open={isModalReviewVisible} setOpen={setModalReviewVisible}>
                <ReviewCreationForm setModalReviewVisible={setModalReviewVisible}> </ReviewCreationForm>
            </FadeModalDialog>
            <div style={{marginTop: "70px", marginLeft:"30px", marginRight:"15px", width:"95vw"}}>
                <div className="row">
                    <div className="col-xl-8">
                        <UserCardBio />
                        <UserCardList  />
                    </div>
                    <UserCardAbout isModalReviewVisible={isModalReviewVisible} setModalReviewVisible={setModalReviewVisible} />
                </div>
            </div>
        </div>
    );
}

export default UserProfile;