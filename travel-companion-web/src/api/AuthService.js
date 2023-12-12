import axios from "axios";

export class AuthService{

    static url = "http://localhost:8080/api/v1/auth";

    static async login(loginData){
        const response = await fetch("http://localhost:8080/api/v1/users/9fc96a23-d6b9-4e54-b926-44e185913d6c/transport/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "no-cors",
            body: JSON.stringify({
                name:"roma"
            }),
        });
        console.log(response)
    }

    static async register(registrationData, callback){
        console.log(JSON.stringify(registrationData))
        const response = await fetch(this.url+"/register", {
            method: "POST",
            body: JSON.stringify(registrationData),
            headers: {
                'Content-Type': 'd'
            },
            mode: "no-cors"
        });
        callback();
    }

}