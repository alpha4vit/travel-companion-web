import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Posts from './pages/Posts';
import Profile from './pages/profile/Profile';
import Auth from './pages/auth/Auth';
import Post from "./components/Posts/Post";
import UserProfile from "./components/UserProfile/UserProf";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtAccessToken'));
    const [isEmailVerified, setIsEmailVerified]= useState(false);


    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtAccessToken');
        setIsLoggedIn(!!jwtToken);
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    useEffect(() => {
        if (isLoggedIn){
            const user = JSON.parse(localStorage.getItem("authenticatedUser"));
            if (user){
                if (user.is_email_verified)
                    setIsEmailVerified(true)
            }
        }
    }, [isLoggedIn])


    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            {isLoggedIn && isEmailVerified ? (
                <Routes>
                    <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} isEmailVerified={isEmailVerified}/>} />
                    <Route path="/profile" element={<Profile owner={true} />} />
                    <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                    <Route path="/posts/:postId" element={<Post />} />
                    <Route path="/users/:userId" element={<UserProfile />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} />} />
                    <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                    <Route path="/posts/:postId" element={<Post />} />
                    <Route path="/users/:userId" element={<UserProfile />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
