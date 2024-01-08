import axios from "axios";

export class ImageService{

    static minioEndpoint = 'http://localhost:9000';
    static bucketName = 'images';

    static getObjectUrl = (bucket, objectName) => {
        return `${this.minioEndpoint}/${bucket}/${objectName}`;
    };

    static async fetchImage(objectName) {

        const url = this.getObjectUrl(this.bucketName, objectName);

        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
            });

            const dataUrl = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
            return dataUrl;
        } catch (error) {
            console.error('Error fetching image:', error);
        }

    };

    static async loadImage(inputFile, user, success, handleAvatarError){
        try {
            const formData = new FormData();
            formData.append('avatar', inputFile);
            const response = await axios.post(`http://localhost:8080/api/v1/users/${user.id}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (response.status === 200) {
                success(response.data);
            }
        }
        catch (error){
            console.log(error)
            if (error.response && error.response.status === 413){
                handleAvatarError("Загружаемый файл слишком большого размера!", true);
            }
            if (error.response && error.response.status === 500){
                handleAvatarError("Произошла внутрення ошибка при загрузке изображения!", true);
            }
        }

    }

}