import React, {useState} from 'react';
import "./Auth.css";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import TransitionAlert from "../../components/UI/Alert/TransitionAlert";
import {AuthService} from "../../api/AuthService";

const PasswordReset= () => {

    const navigateTo = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordResetError, setPasswordResetError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

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


    const reset = () => {
        if (password === '' && passwordConfirmation === ''){
            setPasswordResetError(true);
            setErrorMessage("Введенные пароли не могут быть пустыми!")
        }
        else if (password !== passwordConfirmation) {
            setPasswordResetError(true);
            setErrorMessage("Введенные пароли не совпадают!")
        }
        else {
            AuthService.resetPassword(id, password,
                () => navigateTo("/auth"),
                (message) => {
                    setErrorMessage(message);
                    setPasswordResetError(true);
                },
            )
        }
    }

    return (
        <div className="auth_wrapper">
            <div className="container active" style={{height:390, display:'block'}}>
                <div className="forms" style={{alignItems:"baseline"}}>

                    <div className="form signup" style={{marginTop:0}}>
                        <span className="title">Сброс пароля</span>

                        <form>
                            <div className="input-field">
                                <input onChange={e => {
                                    setPassword(e.target.value);
                                }} type="password" className="password pwReg"
                                       placeholder="Введите новый пароль" required
                                       style={passwordResetError ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}
                                />
                                <i className="uil uil-lock icon"
                                   style={passwordResetError ? {color: '#c7452e'} : {color: '#5cb85c'}}
                                ></i>
                            </div>
                            <div className="input-field">
                                <input onChange={e => {
                                    setPasswordConfirmation(e.target.value)
                                }} type="password" className="password pwReg"
                                       placeholder="Введите новый пароль повторно" required
                                       style={passwordResetError ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}
                                />
                                <i className="uil uil-lock icon"
                                   style={passwordResetError ? {color: '#c7452e'} : {color: '#5cb85c'}}
                                ></i>
                            </div>
                            <TransitionAlert message={errorMessage} open={passwordResetError} setOpen={setPasswordResetError}  />
                            <div className="input-field button">
                                <input onClick={reset} className="button-text" value="Сохранить!"/>
                            </div>
                        </form>

                        <div className="login-signup">
                    <span className="text">Хотите авторизоваться?
                        <a style={{cursor:"pointer"}} onClick={() => navigateTo("/auth")} className="text signup-link" id="signup-link">Авторизоваться</a>
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordReset;