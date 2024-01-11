import axios from "axios";

export class PostResponseService {

    static url = "http://localhost:8080/api/v1/responses";

    static async getAllByUserId(userId){
        const response = await axios.get(this.url+`/users/${userId}`)
        return response.data;
    }

    static async respond(responseBody, userId, postId, handleContactError, handleCommentError, success){
        try {

            const response = await axios.post(this.url + `/users/${userId}/${postId}`, responseBody);
            if (response.status === 200){
                success();
            }
        }
        catch (error){
            if (error.response && error.response.status === 400){
                const errors = error.response.data.errors;
                if (errors.contact)
                    handleContactError(errors.contact);
                if (errors.comment)
                    handleCommentError(errors.comment);
            }
        }
    }

    static async deleteById(id){
        const response = axios.delete(this.url+`/${id}`);
    }

}