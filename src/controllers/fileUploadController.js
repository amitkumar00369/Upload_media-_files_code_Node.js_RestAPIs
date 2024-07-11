const PostModel = require('../Schema/postModel'); // Adjust the path as needed
const base_url = 'https://your-s3-bucket-url/'; // Replace with your actual S3 base URL

const fileUploadImg = async (req, res) => {
  try {
    const files = req.files;
    if (!files) {
      return res.status(404).json({
        message: "File not found, please upload files",
        code: 404,
      });
    }

    const media = files.map((val) => {
      return {
        type: val.mimetype.includes('video') ? "video":"image",
        url: base_url + val.key,
      };
    });

    req.body.media = media;
    console.log(req.body);

    const result = await PostModel.create(req.body);

    return res.status(200).json({
      message: "It's working",
      data: result,
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      code: 500,
    });
  }
};

module.exports = { fileUploadImg };
