import axios from "axios";

export class ReviewService{

    static url = "http://localhost:8080/api/v1/reviews";

    static async getAllByUserId(userId){
        const response = await axios.get(this.url+`/users/${userId}`)
        return response.data;
    }

    static async sendReview(userId, review){
        const authenticated = JSON.parse(localStorage.getItem("authenticatedUser"))
        const response = await axios.post(this.url+`/users/${userId}/${authenticated.id}`,
            review);
        console.log(response)
    }

}