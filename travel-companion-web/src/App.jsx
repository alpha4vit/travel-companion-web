import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Posts from './pages/Posts';
import Profile from './pages/profile/Profile';
import Auth from './pages/auth/Auth';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtAccessToken'));

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtAccessToken');
        setIsLoggedIn(!!jwtToken);
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            {isLoggedIn ? (
                <Routes>
                    <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} />} />
                    <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
