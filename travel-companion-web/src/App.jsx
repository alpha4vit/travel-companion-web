import React, { useState, useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Posts from './pages/Posts';
import Profile from './pages/profile/Profile';
import Auth from './pages/auth/Auth';
import Post from "./components/Posts/Post";
import UserProfile from "./components/UserProfile/UserProf";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import PostTemp from "./components/Posts/PostTemp";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import PopUpAlert from "./components/UI/Alert/PopUpAlert";
import PasswordResetEmail from "./pages/auth/PasswordResetEmail";
import PasswordReset from "./pages/auth/PasswordReset";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtAccessToken'));
    const [isEmailVerified, setIsEmailVerified]= useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

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

    const handleEmailConfirmation = () => {
        setIsEmailVerified(true);
        setIsLoggedIn(true);
    }



    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <PopUpAlert message={alertMessage} visible={alertVisible} setVisible={setAlertVisible} />
            {isLoggedIn && isEmailVerified ? (
                <Routes>
                    <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} isEmailVerified={isEmailVerified}/>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/posts/:postId" element={<PostTemp />} />
                    <Route path="/users/:userId" element={<UserProfile />} />
                    <Route path="/auth/reset" element={<PasswordResetEmail setAlertVisible={setAlertVisible} setAlertMessage={setAlertMessage} />}/>
                    <Route path="/auth/reset/password" element={<PasswordReset />}/>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} />} />
                    <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                    <Route path="/posts/:postId" element={<PostTemp />} />
                    <Route path="/users/:userId" element={<UserProfile />} />
                    <Route path="/auth/confirm" element={<EmailConfirmation setAlertVisible={setAlertVisible} setAlertMessage={setAlertMessage} onConfirmation={handleEmailConfirmation}/>}/>
                    <Route path="/profile" element={<EmailConfirmation setAlertVisible={setAlertVisible} setAlertMessage={setAlertMessage} onConfirmation={handleEmailConfirmation}/>} />
                    <Route path="/auth/reset" element={<PasswordResetEmail setAlertVisible={setAlertVisible} setAlertMessage={setAlertMessage} />}/>
                    <Route path="/auth/reset/password" element={<PasswordReset />}/>
                </Routes>
            )}
        </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;
