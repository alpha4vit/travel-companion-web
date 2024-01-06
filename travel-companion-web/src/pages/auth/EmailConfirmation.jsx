import React, {useState} from 'react';
import {AuthService} from "../../api/AuthService";
import {UserService} from "../../api/UserService";
import {useNavigate} from "react-router-dom";
import TransitionAlert from "../../components/UI/Alert/TransitionAlert";
import Alert from "@mui/material/Alert";

const EmailConfirmation = ({onConfirmation, setAlertVisible, setAlertMessage}) => {

    const navigateTo = useNavigate();

    const [confirmationCode, setConfirmationCode] = useState("");
    const [incorrectCodeError, setIncorrectCodeError] = useState(false);

    const confirm = () => {
        AuthService.confirm(confirmationCode, onConfirmation, navigateTo, setIncorrectCodeError);
    }

    const resend = () => {
        AuthService.resendCode();
        setAlertMessage("Код успешно отправлен!")
        setAlertVisible(true);
    }

    return (
        <div className="auth_wrapper">
            <div className="container" style={{height:350}}>
                <div className="forms" style={{alignItems:"baseline"}}>
                    <div className="form login" style={{marginTop:10}}>
                        <span className="title">Подтверждение почты</span>
                        <form method="post">
                            <div className="input-field">
                                <input onChange={(e) => {
                                    setConfirmationCode(e.target.value);
                                    setIncorrectCodeError(false);
                                }} id="code" name="code" type="text" placeholder="Введите код подтверждения"
                                       style={incorrectCodeError ? {borderBottomColor: '#c7452e'} : {borderBottomColor: '#5cb85c'}}
                                       required/>
                                <i className="uil uil-envelope-check icon"
                                   style={incorrectCodeError ? {color: '#c7452e'} : {color: '#5cb85c'}}
                                ></i>
                            </div>
                            <TransitionAlert message="Неверный код подтверждения!" open={incorrectCodeError} setOpen={setIncorrectCodeError}  />
                            <div className="input-field button">
                                <input onClick={confirm} className="button-text" value="Подтвердить!"/>
                            </div>
                        </form>

                        <div className="login-signup">
                            <span className="text">
                        <a style={{cursor:"pointer"}} onClick={resend} className="text signup-link" id="signup-link">Отправить код еще раз!</a>
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailConfirmation;