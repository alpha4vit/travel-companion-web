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
        if (true) {
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
        await axios.post(this.url+"/register",
            JSON.stringify(registrationData), {
            headers:{
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 201)
                console.log("registered")
            else
                console.log("registration error")
        });

        callback();
    }

    static logout = () =>{
        localStorage.clear();
        window.location.href = "/auth";
    }

}