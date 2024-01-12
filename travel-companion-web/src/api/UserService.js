import axios from "axios";

export class UserService {

    static url = "http://localhost:8080/api/v1/users/";

    static async getById(id, success) {
        try {
            const response = await axios.get(this.url + id);
            if (response.status === 200) {
                success(response.data);
                return response.data;
            }
        }
        catch (error){
            console.log(error)
        }
    }

    static async updateUser(user,
                            success,
                            handleUsernameError,
                            handleEmailError,
                            handlePhoneNumberError,
                            handleBioError) {

        try {
            const response = await axios.patch(this.url + user.id,
                user,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.status === 200) {
                    success();
            }
        }
        catch (error){
            if (error.response && error.response.status === 400){
                const errors = error.response.data.errors;
                if (errors.username)
                    handleUsernameError(errors.username, true);
                if (errors.email)
                    handleEmailError(errors.email, true);
                if (errors.phoneNumber)
                    handlePhoneNumberError(errors.phoneNumber, true);
                if (errors.bio)
                    handleBioError(errors.bio, true)
            }
        }
    }
}