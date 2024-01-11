import axios from "axios";
import {DateConverter} from "../utils/DateConverter";

export class PostService {

    static url = "http://localhost:8080/api/v1/posts";

    static async getAll(limit = 10, page = 1) {
        const response = await axios.get(this.url + "/pages", {
            params: {
                limit: limit,
                page: page
            }
        });
        response.data.body.map(post => {
            return post;
        })
        return response;
    }

    static async createPost(post, handleTitleError, handleDescError, handleFeeError, handleDateError, success) {
        try {
            const user_id = JSON.parse(localStorage.getItem("authenticatedUser")).id;
            const response = await axios.post(this.url + `/${user_id}/create`, post);
            if (response.status === 200) {
                success(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = error.response.data.errors;
                if (errors.title)
                    handleTitleError(errors.title);
                if (errors.description) {
                    handleDescError(errors.description);
                }
                if (errors.fee)
                    handleFeeError(errors.fee);
                if (errors.date)
                    handleDateError(errors.date)
            }
        }

    }

    static async getAllByUserId(userId) {
        const response = await axios.get(this.url + `/user/${userId}`);
        return response.data;
    }

    static async getById(postId) {
        const response = await axios.get(this.url + `/${postId}`);
        return response.data;

    }

    static async deleteById(postId) {
        const response = await axios.delete(this.url + `/${postId}`);
    }

    static async update(post, handleTitleError, handleDescError, handleFeeError, handleDateError, success) {
        try {
            const response = await axios.patch(this.url + `/${post.id}`,
                post,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.status === 200){
                success();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = error.response.data.errors;
                if (errors.title)
                    handleTitleError(errors.title);
                if (errors.description) {
                    handleDescError(errors.description);
                }
                if (errors.fee)
                    handleFeeError(errors.fee);
                if (errors.date)
                    handleDateError(errors.date)
            }
        }
    }


}