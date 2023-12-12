import React, {useEffect, useState} from 'react';
import "./Profile.css";
import CardBio from "../../components/Profile/CardBio";
import CardList from "../../components/Profile/CardList";
import CardAbout from "../../components/Profile/CardAbout";

const Profile = () => {
    const [user, setUser] = useState(null);
    const fetchUser = () => {

    }

    useEffect()

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        <CardBio />
                        <CardList />
                    </div>
                    <CardAbout />
                </div>
            </div>
        </div>
    );
}

export default Profile;