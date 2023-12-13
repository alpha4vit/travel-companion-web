import axios from "axios";

export class PostService{

    static url = "http://localhost:8080/api";

    static async getAll(limit =10, page =1) {
        return await axios.get(this.url + "/v1/posts", {
            params: {
                limit: limit,
                page: page
            }
        });
    }
}