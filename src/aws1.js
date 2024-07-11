require('dotenv').config();
var AWS = require('aws-sdk');
const error = require("../../utils/error");
const {AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION} = require("../../utils/constants");

exports.fileUpload = async (req, res, next) => {
    try {
        AWS.config.update({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            region: AWS_REGION
        });
        const s3 = new AWS.S3();

        // Binary data base64
        const fileContent = Buffer.from(req.files.file.data, 'binary');

        let params, fileName;

        // Setting up S3 upload parameters
        if (req.body.type == 1) {
            params = {
                Bucket: AWS_BUCKET_NAME,
                Key: `img/${Date.now()}.jpg`,
                Body: fileContent,
                ContentType: 'image/jpg'
            };
        } else if (req.body.type == 2) {
            params = {
                Bucket: AWS_BUCKET_NAME,
                Key: `video/${Date.now()}.mp4`,
                Body: fileContent,
                ContentType: 'video/mp4'
            };
        } else if (req.body.type == 3) {
            params = {
                Bucket: AWS_BUCKET_NAME,
                Key: `audio/${Date.now()}.mp3`,
                Body: fileContent,
                ContentType: 'audio/mp3'
            };
        } else if (req.body.type == 4) {
            // Use the original file name for PDF
            fileName = `${req.files.file.name}`;
            params = {
                Bucket: AWS_BUCKET_NAME,
                Key: fileName,
                Body: fileContent,
                ContentType: 'application/pdf'
            };
        } else if (req.body.type == 5) {
            params = {
                Bucket: AWS_BUCKET_NAME,
                Key: `word/${Date.now()}.docx`,
                Body: fileContent,
                ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            };
        }

        // Uploading files to the bucket
        var filepath = await s3.upload(params).promise();

        // Include the file name in the response
        const response = {
            status: error.status.OK,
            url: filepath.Location
        };

        if (fileName) {
            response.fileName = fileName;
        }

        return res.status(error.status.OK).json(response);
    } catch (e) {
        return res.status(error.status.InternalServerError).json({
            message: e.message,
            status: error.status.InternalServerError
        });
    }
};

// exports.imgDelete=async (req,res,next)=>{
//
//     const {url,type}=req.body;
//     if(type=="1"){
//         var folder = "img"
//     }else{
//         var folder="doc"
//     }
//     const imgName = url.split(folder);
//     try{
//         AWS.config.update({
//             accessKeyId: process.env.AWS_ACCESS_KEY,
//             accessSecretKey: process.env.AWS_SECRET_KEY,
//             region: process.env.AWS_REGION
//         })
//         const s3 = new AWS.S3();
//
//         // deleting files to the bucket
//         if(imgName[1]) {
//             const params = {
//                 Bucket: AWS_BUCKET_NAME,
//                 Key: `${folder}${imgName[1]}`,
//             };
//
//             await s3.deleteObject(params, (err, data) => {
//                 if (err) {
//                     res.status(error.status.InternalServerError).json({
//                         message:req.msg.SomethingWentWrong
//                     });
//                 }
//                 res.status(error.status.OK).json({message:req.msg.fileDeleted});
//             });
//         }else{
//             return res.status(error.status.UnprocessableEntity).json({
//                 message:req.msg.SomethingWentWrong
//             })
//         }
//
//     }catch(e){
//         return res.status(error.status.InternalServerError).json({
//             message:req.msg.InternalServerError
//         })
//     }
// }