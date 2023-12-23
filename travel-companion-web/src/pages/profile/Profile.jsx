import React, {useEffect, useState} from 'react';
import "./Profile.css";
import CardBio from "../../components/Profile/CardBio";
import CardAbout from "../../components/Profile/CardAbout";
import CardList from "../../components/Profile/CardList";
import {PostService} from "../../api/PostService";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("authenticatedUser"));

    return (
        <div>
            <div style={{marginTop: "70px", marginLeft:"30px", marginRight:"15px", width:"95vw"}}>
                <div className="row">
                    <div className="col-xl-8">
                        <CardBio />
                        <CardList user={user} />
                    </div>
                    <CardAbout user={user}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;