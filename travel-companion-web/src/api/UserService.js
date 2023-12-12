import axios from "axios";

export class UserService{

    static url = "http://localhost:8080/api";

    static async getAuthenticated(){
        return await axios.get(this.url + "/v1/users");
    }

}