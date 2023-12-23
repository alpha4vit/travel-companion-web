import axios from "axios";

export class ReviewService{

    static url = "http://localhost:8080/api/v1/reviews";

    static async getAllByUserId(userId){
        const response = await axios.get(this.url+`/users/${userId}`)
        return response.data;
    }

}