import axios from "axios";

export class UserService{

    static url = "http://localhost:8080/api";

    static async getById(id){
        const response = await axios.get(this.url+"/v1/users/"+id);
        return response.data;
    }

}