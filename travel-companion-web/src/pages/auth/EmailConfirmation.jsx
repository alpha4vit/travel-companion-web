import React, {useState} from 'react';
import {AuthService} from "../../api/AuthService";
import {UserService} from "../../api/UserService";

const EmailConfirmation = ({onConfirmation}) => {

    const [confirmationCode, setConfirmationCode] = useState("");

    const confirm = () => {
        AuthService.confirm();
        onConfirmation();
    }

    return (
        <div className="auth_wrapper">
            <div className="container">
                <div className="forms">
                    <div className="form login">
                        <span className="title">Подтверждение почты</span>
                        <form method="post">
                            <div className="input-field">
                                <input onChange={(e) => setConfirmationCode(e.target.value)} id="code" name="code" type="text" placeholder="Введите код подтверждения"
                                       required/>
                                <i className="uil uil-envelope icon"></i>
                            </div>
                            <span className="text">

                            </span>

                            <div className="input-field button">
                                <input onClick={confirm} className="button-text" value="Подтвердить!"/>
                            </div>
                        </form>

                        <div className="login-signup">
                            <span className="text">
                        <a style={{cursor:"pointer"}} className="text signup-link" id="signup-link">Отправить код еще раз!</a>
                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailConfirmation;