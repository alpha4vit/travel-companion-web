import axios from "axios";

export class AuthService{

    static url = "http://localhost:8080/api/v1/auth";

    static async login(loginData){
        await axios.post(this.url+"/login",
            JSON.stringify(loginData), {
                headers:{
                    "Content-Type": "application/json"
                }
            }).then(response => {
            if (response.status === 200)
                console.log(response.data)
            else
                console.log("registration error")
        });
    }

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

}