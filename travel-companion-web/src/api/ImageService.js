import axios from "axios";

export class ImageService{

    static user = JSON.parse(localStorage.getItem("authenticatedUser"));
    static minioEndpoint = 'http://localhost:9000';
    static bucketName = 'images';
    static accessKey = 'roma';
    static secretKey = 'roma';

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

    static async loadImage(inputFile){
        const formData = new FormData();
        formData.append('avatar', inputFile);
        const response = await axios.post(`http://localhost:8080/api/v1/users/${this.user.id}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log(response.data)
        return response.data;
    }

}