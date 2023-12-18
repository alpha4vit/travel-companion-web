
var Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint: 'http://localhost',
    port: 9000,
    useSSL: true,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
})

export const getFile = (fileName) => {
    var size = 0;
    minioClient.getObject('images', fileName, function (err, dataStream) {
        if (err) {
            return console.log(err)
        }
        dataStream.on('data', function (chunk) {
            size += chunk.length
        })
        dataStream.on('end', function () {
            console.log('End. Total size = ' + size)
        })
        dataStream.on('error', function (err) {
            console.log(err)
        })
    })
}