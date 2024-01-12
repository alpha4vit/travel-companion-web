import axios from "axios";
import {UserService} from "./UserService";
import {useNavigate} from "react-router-dom";

export class AuthService{


    static url = "http://localhost:8080/api/v1/auth";

    static async login(loginData, setUsernameError, setPasswordError, onLogin, navigateTo) {
        try {
            const response = await axios.post(
                this.url + "/login",
                JSON.stringify(loginData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const status = response.status;
            console.log(status)
            if (status === 200) {
                localStorage.setItem("jwtAccessToken", response.data.accessToken);
                localStorage.setItem("jwtRefreshToken", response.data.refreshToken);
                const user = await UserService.getById(response.data.id, (resp) => {
                    localStorage.setItem("authenticatedUser", JSON.stringify(resp));
                    onLogin();
                    navigateTo("/posts");
                });

            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setUsernameError(true);
            }
            if (error.response && error.response.status === 403){
                setPasswordError(true);
            }
        }
    };


    static async register(registrationData, callback, handleUsernameRegisterError, handleEmailRegisterError, handlePasswordRegisterError, navigateTo){
        try {
            const response = await axios.post(this.url+"/register",
                JSON.stringify(registrationData), {
                    headers:{
                        "Content-Type": "application/json"
                    }
                });
            if (response.status === 201){
                localStorage.setItem("jwtAccessToken", response.data.accessToken);
                localStorage.setItem("jwtRefreshToken", response.data.refreshToken);
                await UserService.getById(response.data.id, (resp) => {
                    localStorage.setItem("authenticatedUser", JSON.stringify(resp));
                    navigateTo("/auth/confirm");
                });
            }
        }
        catch (error){
            if (error.response && error.response.status === 400){
                const {errors} = error.response.data;
                if (errors.username != null){
                    handleUsernameRegisterError(errors.username, true)
                }
                if (errors.email != null){
                    handleEmailRegisterError(errors.email, true);
                }
                if (errors.password != null){
                    handlePasswordRegisterError(errors.password, true);
                }
            }
        }
    }

    static async confirm(confirmationCode, onConfirmation, navigateTo, setIncorrectCodeError){
        try {
            const authenticated = JSON.parse(localStorage.getItem("authenticatedUser"));
            const response = await axios.post(this.url+"/enable",
                {
                    id: authenticated.id,
                    confirmation_code: confirmationCode
                }, {
                    headers:{
                        "Content-Type": "application/json"
                    }
                });
            console.log(response)
            if (response.status === 200){
                const current = JSON.parse(localStorage.getItem("authenticatedUser"));
                await UserService.getById(current.id, (resp) => {
                    localStorage.setItem("authenticatedUser", JSON.stringify(resp));
                    onConfirmation();
                    navigateTo("/posts");
                });
            }
        }
        catch (error){
            if (error.response && error.response.status === 400){
                setIncorrectCodeError(true);
            }
        }
    }

    static async resendCode() {
        const user = JSON.parse(localStorage.getItem("authenticatedUser"));
        await axios.get(this.url+`/enable/${user.id}/resend`);
    }

    static async sendResetLetter(email, success, fail){
        try {
            const response = await axios.get(this.url+"/reset", {
                params:{
                    email:email
                }
            });
            if (response.status === 200){
                success();
            }
        }
        catch (error){
            if (error.response && error.response.status === 404){
                fail();
            }
            else if (error.response && error.response.status === 500){
                //fail("Произошла ошибка при попытке изменить пароль!", "internal")
            }
        }
    }

    static async resetPassword(id, password, success, fail){
        try {
            const response = await axios.get(this.url+"/reset/password", {
                params:{
                    id:id,
                    password:password
                }
            });
            if (response.status === 200){
                success();
            }
        }
        catch (error){
            if (error.response && error.response.status === 400){
                console.log(error)
                fail("Данный пароль уже используется!");
            }

        }
    }

}