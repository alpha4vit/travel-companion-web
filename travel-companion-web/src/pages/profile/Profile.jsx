import React from 'react';
import "./Profile.css";
import CardBio from "../../components/Profile/CardBio";
import CardAbout from "../../components/Profile/CardAbout";
import CardList from "../../components/Profile/CardList";

const Profile = () => {

    const user = JSON.parse(localStorage.getItem("authenticatedUser"));

    return (
        <div>
            <div style={{marginTop: "70px", marginLeft:"30px", marginRight:"15px", width:"95vw"}}>
                <div className="row">
                    <div className="col-xl-8">
                        <CardBio user={user}/>
                        <CardList />
                    </div>
                    <CardAbout />
                </div>
            </div>
        </div>
    );
}

export default Profile;