import axios from "axios";
import {UserService} from "./UserService";

export class AuthService{

    static url = "http://localhost:8080/api/v1/auth";

    static async login(loginData){
        const response = await axios.post(this.url+"/login",
            JSON.stringify(loginData), {
                headers:{
                    "Content-Type": "application/json"
                }
            });
        if (response.status === 200) {
            localStorage.setItem("jwtAccessToken", response.data.accessToken);
            localStorage.setItem("jwtRefreshToken", response.data.refreshToken);
            const user = await UserService.getById(response.data.id);
            localStorage.setItem("authenticatedUser", JSON.stringify(user));
            window.location.href = "/posts"
        }
        else
            console.log("login error")
    };

    static async register(registrationData, callback){
        const response = await axios.post(this.url+"/register",
            JSON.stringify(registrationData), {
            headers:{
                "Content-Type": "application/json"
            }
        });
        if (response.status === 201){
            localStorage.setItem("jwtAccessToken", response.data.accessToken);
            localStorage.setItem("jwtRefreshToken", response.data.refreshToken);
            const user = await UserService.getById(response.data.id);
            localStorage.setItem("authenticatedUser", JSON.stringify(user));
        }
        callback();
    }

    static async confirm(){
        const authenticated = JSON.parse(localStorage.getItem("authenticatedUser"));
        const response = await axios.post(this.url+"/enable",
            {
                id: authenticated.id,
                confirmation_code: authenticated.confirmation_code
            }, {
                headers:{
                    "Content-Type": "application/json"
                }
            });
        if (response.status === 200){
            const current = JSON.parse(localStorage.getItem("authenticatedUser"));
            console.log(current)
            const user = await UserService.getById(current.id);
            localStorage.setItem("authenticatedUser", JSON.stringify(user));
            window.location.href  = '/posts'
        }
    }


}