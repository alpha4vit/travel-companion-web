import React, {useState} from 'react';
import "./Auth.css";
import {AuthService} from "../../api/AuthService";
import {Link, useNavigate} from "react-router-dom";
import TransitionAlert from "../../components/UI/Alert/TransitionAlert";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from "@mui/material/IconButton";

const Auth = ({onLogin, onVerification}) => {

    const [loginData, setLoginData] = useState({
        username: "",
        password:""
    });
    const [registrationData, setRegistrationData] = useState({
        username:"",
        email:"",
        password:""
    });


    const navigateTo = useNavigate();

    const [usernameIncorrectLogin, setUsernameIncorrectLogin] = useState(false);
    const [passwordIncorrectLogin, setPasswordIncorrectLogin] = useState(false);

    const [usernameIncorrectRegister, setUsernameIncorrectRegister] = useState(false);
    const [emailIncorrectRegister, setEmailIncorrectRegister] = useState(false);
    const [passwordIncorrectRegister, setPasswordIncorrectRegister] = useState(false);

    const [errorUsernameRegisterMessage, setErrorUsernameRegisterMessage] = useState("");
    const [errorEmailRegisterMessage, setErrorEmailRegisterMessage] = useState("");
    const [errorPasswordRegisterMessage, setErrorPasswordRegisterMessage] = useState("");


    const showHidePassword = (target) => {
        let pwField;
        let pwShowHide;
        if (target.classList.contains("showHidePwReg")) {
            pwField = document.querySelector(".pwReg");
            pwShowHide = document.querySelector(".showHidePwReg");
        }
        else {
            pwField = document.querySelector(".pwLog");
            pwShowHide = document.querySelector(".showHidePwLog");
        }
        if (pwField.type === "password") {
            pwField.type = "text";
            pwShowHide.classList.replace("uil-eye-slash", "uil-eye");
        } else {
            pwField.type = "password";
            pwShowHide.classList.replace("uil-eye", "uil-eye-slash");
        }
    }

    const showRegistrationFrom = () => {
        const container = document.querySelector(".container");
        container.classList.add("active");
    }

    const hideRegistrationForm = () => {
        const container = document.querySelector(".container");
        container.classList.remove("active");
    }

    const login = () => {
        AuthService.login(loginData, setUsernameIncorrectLogin, setPasswordIncorrectLogin, onLogin, navigateTo);
    }

    const register = async () => {
        var error = false;
        if (registrationData.username === ""){
            setErrorUsernameRegisterMessage("Имя пользователя не может быть пустым!");
            setUsernameIncorrectRegister(true);
            error = true;
        }
        if (registrationData.email === ""){
            setErrorEmailRegisterMessage("Электронная почта не может быть пустой!");
            setEmailIncorrectRegister(true);
            error = true;
        }
        if (registrationData.password === ""){
            setErrorPasswordRegisterMessage("Пароль не может быть пустым!");
            setPasswordIncorrectRegister(true);
            error = true;
        }

        if (!error) {
            await AuthService.register(registrationData, hideRegistrationForm, handleRegisterUsernameError, handleRegisterEmailError, handleRegisterPasswordError, navigateTo);
        }
    }

    const handleRegisterUsernameError = (message, value) => {
        setUsernameIncorrectRegister(value);
        setErrorUsernameRegisterMessage(message);
    }

    const handleRegisterEmailError = (message, value) => {
        setEmailIncorrectRegister(value);
        setErrorEmailRegisterMessage(message);
    }

    const handleRegisterPasswordError = (message, value) => {
        setPasswordIncorrectRegister(value);
        setErrorPasswordRegisterMessage(message);
    }

    return (
        <div className="auth_wrapper">
            <div className="container" >
                <div className="forms">
                    <div className="form login">
                        <span className="title">Авторизация</span>
                        <form method="post">
                            <div className="input-field" >
                                <input onChange={e => {
                                    setLoginData({...loginData, username: e.target.value});
                                    setUsernameIncorrectLogin(false);
                                }} id="username" name="username" type="text" placeholder="Введите имя пользователя"
                                       required style={usernameIncorrectLogin ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}/>
                                <i className="uil uil-envelope icon" style={usernameIncorrectLogin ? {color: '#c7452e'} : {color: '#5cb85c'}}></i>
                            </div>
                            <TransitionAlert message="Имя пользователя не найдено!" open={usernameIncorrectLogin} setOpen={setUsernameIncorrectLogin}  />
                            <div className="input-field" >
                                <input onChange={e => {
                                    setLoginData({...loginData, password: e.target.value});
                                    setPasswordIncorrectLogin(false);
                                }
                                } name="password" type="password" className="password pwLog" placeholder="Введите пароль"
                                       required  style={passwordIncorrectLogin ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}/>
                                <i className="uil uil-lock icon" style={passwordIncorrectLogin ? {color: '#c7452e'} : {color: '#5cb85c'}}></i>
                                <i onClick={(e) => showHidePassword(e.target)} className="uil uil-eye-slash showHidePw showHidePwLog" style={passwordIncorrectLogin ? {color: '#c7452e'} : {color: '#5cb85c'}}></i>
                            </div>
                            <TransitionAlert message="Введен неверный пароль!" open={passwordIncorrectLogin} setOpen={setPasswordIncorrectLogin}  />
                            <div className="checkbox-text">
                                <div className="checkbox-content">
                                    <input type="checkbox" id="logCheck"/>
                                    <label htmlFor="logCheck" className="text">Запомнить меня</label>
                                </div>
                                <Link to="/auth/reset">
                                 <a style={{cursor:"pointer"}} className="text">Забыли пароль?</a>
                                </Link>
                            </div>

                            <div className="input-field button">
                                <input onClick={login} className="button-text" value="Login"/>
                            </div>
                        </form>

                        <div className="login-signup">
                    <span className="text">Еще не зарегистрированы?
                        <a style={{cursor:"pointer"}} onClick={showRegistrationFrom} className="text signup-link" id="signup-link">Зарегистрироваться</a>
                    </span>
                        </div>
                    </div>

                    <div className="form signup">
                        <span className="title">Регистрация</span>

                        <form>
                            <div className="input-field">
                                <input onChange={e => {
                                    setRegistrationData({...registrationData, username: e.target.value});
                                    setUsernameIncorrectRegister(false);
                                }} type="text" placeholder="Введите имя пользователя" required
                                       style={usernameIncorrectRegister ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}
                                />
                                <i className="uil uil-user"
                                   style={usernameIncorrectRegister ? {color: '#c7452e'} : {color: '#5cb85c'}}
                                ></i>
                            </div>
                            <TransitionAlert message={errorUsernameRegisterMessage} open={usernameIncorrectRegister} setOpen={setUsernameIncorrectRegister}  />
                            <div className="input-field">
                                <input onChange={e => {
                                    setRegistrationData({...registrationData, email: e.target.value});
                                    setEmailIncorrectRegister(false);
                                }} type="text" placeholder="Введите электронную почту" required
                                       style={emailIncorrectRegister ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}
                                />
                                <i className="uil uil-envelope icon"
                                   style={emailIncorrectRegister ? {color: '#c7452e'} : {color: '#5cb85c'}}
                                ></i>
                            </div>
                            <TransitionAlert message={errorEmailRegisterMessage} open={emailIncorrectRegister} setOpen={setEmailIncorrectRegister}  />
                            <div className="input-field">
                                <input onChange={e => {
                                    setRegistrationData({...registrationData, password: e.target.value});
                                    setPasswordIncorrectRegister(false);
                                }} type="password" className="password pwReg"
                                       placeholder="Введите пароль" required
                                       style={passwordIncorrectRegister ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}
                                />
                                <i className="uil uil-lock icon"
                                   style={passwordIncorrectRegister ? {color: '#c7452e'} : {color: '#5cb85c'}}
                                ></i>
                                <i onClick={(e) => showHidePassword(e.target)}  className="uil uil-eye-slash showHidePw showHidePwReg"
                                   style={passwordIncorrectRegister ? {color: '#c7452e'} : {color: '#5cb85c'}}
                                ></i>
                            </div>
                            <TransitionAlert message={errorPasswordRegisterMessage} open={passwordIncorrectRegister} setOpen={setPasswordIncorrectRegister}  />
                            <div className="checkbox-text">
                                <div className="checkbox-content">
                                    <input type="checkbox" id="termCon"/>
                                    <label htmlFor="termCon" className="text">Я принимаю условия соглашения</label>
                                </div>
                            </div>
                            <div className="input-field button">
                                <input onClick={register} className="button-text" value="Sign up"/>
                            </div>
                        </form>

                        <div className="login-signup">
                    <span className="text">Уже есть аккаунт?
                        <a style={{cursor:"pointer"}} onClick={hideRegistrationForm} id="login-link" className="text login-link">Авторизоваться!</a>
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;