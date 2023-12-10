import axios from "axios";

export class PostService{

    static url = "http://localhost:8080/api";

    static async getAll(){
        const response = await axios.get(this.url+"/v1/posts");
        console.log(response);
        return response;
    }
}