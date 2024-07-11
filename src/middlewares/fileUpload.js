const { S3Client } = require('@aws-sdk/client-s3');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();
const app = express();

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION_NAME,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_STORAGE_BUCKET_NAME,
    // acl: process.env.AWS_DEFAULT_ACL,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let folder = '';
      if (file.mimetype.startsWith('image/')) {
        folder = 'images';
      } else if (file.mimetype.startsWith('video/')) {
        folder = 'videos';
      } else if (file.mimetype === 'application/pdf/txt') {
        folder = 'pdfs';
      } else {
        folder = 'others'; // in case there are other file types
      }

      cb(null, `Node/${folder}/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

const files = upload.array('files', 10);
module.exports=files;