import React, {useEffect, useState} from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/inter';
import '@coreui/coreui/dist/css/coreui.min.css'
import './styles/App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import Posts from './pages/posts/Posts';
import Profile from './pages/profile/Profile';
import Auth from './pages/auth/Auth';
import UserProfile from "./components/UserProfile/UserProf";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import PostTemp from "./components/Posts/PostTemp";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import PopUpAlert from "./components/UI/Alert/PopUpAlert";
import PasswordResetEmail from "./pages/auth/PasswordResetEmail";
import PasswordReset from "./pages/auth/PasswordReset";
import NavbarTemp from "./components/UI/Navbar/NavbarTemp";
import MyMap from "./components/map/MyMap";

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
            <NavbarTemp isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <PopUpAlert message={alertMessage} visible={alertVisible} setVisible={setAlertVisible} />
            {isLoggedIn && isEmailVerified ? (
                <Routes>
                    <Route path="/posts" element={<Posts isLoggedIn={isLoggedIn} isEmailVerified={isEmailVerified}/>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/posts/:postId" element={<PostTemp />} />
                    <Route path="/users/:userId" element={<UserProfile />} />
                    <Route path="/auth/reset" element={<PasswordResetEmail setAlertVisible={setAlertVisible} setAlertMessage={setAlertMessage} />}/>
                    <Route path="/auth/reset/password" element={<PasswordReset />}/>
                    <Route path="/map" element={<MyMap />} />
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
                    <Route path="/map" element={<MyMap />} />
                </Routes>
            )}
        </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;
