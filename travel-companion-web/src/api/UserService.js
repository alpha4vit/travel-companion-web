import axios from "axios";

export class UserService{

    static url = "http://localhost:8080/api/v1/users/";

    static async getById(id){
        const response = await axios.get(this.url+id);
        return response.data;
    }

    static async updateUser(user){
        const response = await axios.patch(this.url+user.id,
                user,
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
            );
        console.log(response)
    }



}