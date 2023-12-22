import axios from "axios";

export class PostReponseService{

    static url = "http://localhost:8080/api/v1/responses";

    static async getAllByUserId(userId){
        const response = await axios.get(this.url+`/users/${userId}`)
        console.log(response.data)
        return response.data;
    }

}