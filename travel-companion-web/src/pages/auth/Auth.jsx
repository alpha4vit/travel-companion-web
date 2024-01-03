import React, {useState} from 'react';
import "./Auth.css";
import {AuthService} from "../../api/AuthService";
import {Link} from "react-router-dom";


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
        AuthService.login(loginData);
        onLogin();
    }

    const register = async () => {
        await AuthService.register(registrationData, hideRegistrationForm);
    }

    return (
        <div className="auth_wrapper">
            <div className="container">
                <div className="forms">
                    <div className="form login">
                        <span className="title">Авторизация</span>
                        <form method="post">
                            <div className="input-field">
                                <input onChange={e => setLoginData({...loginData, username:e.target.value})} id="username" name="username" type="text" placeholder="Введите имя пользователя"
                                       required/>
                                <i className="uil uil-envelope icon"></i>
                            </div>
                            <div className="input-field">
                                <input onChange={e => setLoginData({...loginData, password:e.target.value})} name="password" type="password" className="password pwLog" placeholder="Введите пароль"
                                       required/>
                                <i className="uil uil-lock icon"></i>
                                <i onClick={(e) => showHidePassword(e.target)} className="uil uil-eye-slash showHidePw showHidePwLog"></i>
                            </div>
                            <span className="text">

                            </span>
                            <div className="checkbox-text">
                                <div className="checkbox-content">
                                    <input type="checkbox" id="logCheck"/>
                                    <label htmlFor="logCheck" className="text">Запомнить меня</label>
                                </div>
                                <a style={{cursor:"pointer"}} className="text">Забыли пароль?</a>
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
                                <input onChange={e => setRegistrationData({...registrationData, username:e.target.value})} type="text" placeholder="Введите имя пользователя" required/>
                                <i className="uil uil-user"></i>
                            </div>
                            <div className="input-field">
                                <input onChange={e => setRegistrationData({...registrationData, email:e.target.value})} type="text" placeholder="Введите электронную почту" required/>
                                <i className="uil uil-envelope icon"></i>
                            </div>
                            <div className="input-field">
                                <input onChange={e => setRegistrationData({...registrationData, password:e.target.value})} type="password" className="password pwReg"
                                       placeholder="Введите пароль" required/>
                                <i className="uil uil-lock icon"></i>
                                <i onClick={(e) => showHidePassword(e.target)}  className="uil uil-eye-slash showHidePw showHidePwReg"></i>
                            </div>
                            <div className="checkbox-text">
                                <div className="checkbox-content">
                                    <input type="checkbox" id="termCon"/>
                                    <label htmlFor="termCon" className="text">Я принимаю условия соглашения</label>
                                </div>
                            </div>

                            <Link to={"/auth/confirm"}><div className="input-field button">
                                <input onClick={register} className="button-text" value="Sign up"/>
                            </div></Link>
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