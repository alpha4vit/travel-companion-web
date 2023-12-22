import axios from "axios";

export class PostService{

    static url = "http://localhost:8080/api/v1/posts";

    static async getAll(limit =10, page =1) {
        return await axios.get(this.url+"/pages", {
            params: {
                limit: limit,
                page: page
            }
        });
    }

    static async createPost(post){
        const user_id = JSON.parse(localStorage.getItem("authenticatedUser")).id;
        const response = await axios.post(this.url+`/${user_id}/create`, post);
        return response.data;
    }

    static async getAllByUserId(userId){
        const response = await axios.get(this.url+`/user/${userId}`);
        return response.data;
    }

}