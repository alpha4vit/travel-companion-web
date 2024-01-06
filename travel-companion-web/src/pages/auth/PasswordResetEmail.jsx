import React, {useState} from 'react';
import "./Auth.css";
import {AuthService} from "../../api/AuthService";
import {useNavigate} from "react-router-dom";
import TransitionAlert from "../../components/UI/Alert/TransitionAlert";

const PasswordResetEmail = ({setAlertVisible, setAlertMessage}) => {

    const navigateTo = useNavigate();
    const [email, setEmail] = useState("");
    const [emailIncorrect, setEmailIncorrect] = useState(false);

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


    const sendLetter = () => {
        AuthService.sendResetLetter(email,
            () => {
            setAlertVisible(true);
            setAlertMessage("Письмо успешно отправлено!")
        },
            ()=>setEmailIncorrect(true));
    }


    return (
        <div className="auth_wrapper">
            <div className="container" style={{height:350, display:'block'}}>
                <div className="forms" style={{alignItems:"baseline"}}>
                    <div className="form login" style={{marginTop:0}}>
                        <span className="title">Сброс пароля</span>
                        <form>
                            <div className="input-field" >
                                <input onChange={e => {
                                    setEmail(e.target.value);
                                    setEmailIncorrect(false);
                                }} id="username" name="username" type="text" placeholder="Введите электронную почту"
                                       required style={emailIncorrect ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}/>
                                <i className="uil uil-envelope icon" style={emailIncorrect ? {color: '#c7452e'} : {color: '#5cb85c'}}></i>
                            </div>
                            <TransitionAlert message="Электронная почта не найдена!" open={emailIncorrect} setOpen={setEmailIncorrect}  />

                            <div className="input-field button">
                                <input onClick={sendLetter} className="button-text" value="Отправить письмо!"/>
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

export default PasswordResetEmail;