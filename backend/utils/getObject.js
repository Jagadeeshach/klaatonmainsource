const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("./awsCredentials");
require("dotenv").config();

exports.getObject = async (key) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
